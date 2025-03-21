use sqlx::{Executor, Sqlite};

use crate::errors::Error;

pub async fn get_system_prompt(
    profile: i64,
    model: &str,
    executor: impl Executor<'_, Database = Sqlite>,
) -> Result<Option<String>, Error> {
    Ok(sqlx::query_as::<_, (String,)>(
        r#"
            SELECT prompt
            FROM system_prompts
            WHERE profile_id = $1 AND model = $2;
        "#,
    )
    .bind(profile)
    .bind(model)
    .fetch_optional(executor)
    .await?
    .map(|tuple| tuple.0))
}

pub async fn set_system_prompt(
    profile: i64,
    model: &str,
    executor: impl Executor<'_, Database = Sqlite>,
    content: Option<&str>,
) -> Result<Option<String>, Error> {
    let prompt = content
        .map(|s| s.trim())
        .and_then(|s| if s.is_empty() { None } else { Some(s) });

    Ok(if let Some(prompt) = prompt {
        sqlx::query_as::<_, (String,)>(
            r#"
                INSERT INTO system_prompts (profile_id, model, prompt)
                VALUES ($1, $2, $3)
                ON CONFLICT (profile_id, model) DO UPDATE SET prompt = excluded.prompt
                RETURNING prompt;
            "#,
        )
        .bind(profile)
        .bind(model)
        .bind(prompt)
        .fetch_optional(executor)
        .await?
        .map(|tuple| tuple.0)
    } else {
        sqlx::query(
            r#"
                DELETE FROM system_prompts
                WHERE profile_id = $1 AND model = $2;
            "#,
        )
        .bind(profile)
        .bind(model)
        .execute(executor)
        .await?;

        None
    })
}
