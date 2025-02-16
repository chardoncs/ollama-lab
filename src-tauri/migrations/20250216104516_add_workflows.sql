CREATE TABLE workflow_templates (
    id          INTEGER NOT NULL PRIMARY KEY,
    name        TEXT NOT NULL,
    json        TEXT NOT NULL
);

CREATE TABLE workflows (
    id          INTEGER NOT NULL PRIMARY KEY,
    name        TEXT NOT NULL,
    json        TEXT NOT NULL,
    template_id INTEGER REFERENCES workflow_templates (id) ON DELETE SET NULL ON UPDATE CASCADE
);
