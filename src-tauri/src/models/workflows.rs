use ollama_rest::models::chat::Role;
use serde::{Deserialize, Serialize};

use super::chat::IncomingUserPrompt;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Workflow {
    name: String,
    steps: Vec<Step>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case", tag = "type")]
pub enum Step {
    #[serde(rename_all = "camelCase")]
    Fixture {
        text: String,
        as_role: Role,
    },

    #[serde(rename_all = "camelCase")]
    UserInput {
        prompt: IncomingUserPrompt,
        as_role: Role,
    },

    #[serde(rename_all = "camelCase")]
    Generation {
        instance_id: String,
        model: Option<String>,
        as_role: Option<Role>,
    },

    #[serde(rename_all = "camelCase")]
    Loop {
        times: Option<u64>,
        steps: Vec<Step>,
        pause: bool,
    },

    #[serde(rename_all = "camelCase")]
    Pause {
        seconds: Option<u32>,
    },
}
