{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "http://jsonschema.net",
  "type": "object",
  "title": "Root schema.",
  "description": "An explanation about the puropose of this instance described by this schema.",
  "name": "/",
  "properties": {
    "_id": {
      "id": "http://jsonschema.net/_id",
      "type": "string",
      "title": "_id schema.",
      "description": "Log unique identifier.",
      "name": "_id"
    },
    "category": {
      "id": "http://jsonschema.net/category",
      "type": "string",
      "title": "Category schema.",
      "description": "An explanation about the puropose of this instance described by this schema.",
      "name": "category",
      "enum": [
        "candidate",
        "job",
        "client",
        "agency"
      ]
    },
    "id": {
      "id": "http://jsonschema.net/id",
      "type": "string",
      "title": "Id schema.",
      "description": "Unique identifier for the category item.",
      "name": "id"
    },
    "action": {
      "id": "http://jsonschema.net/action",
      "type": "string",
      "title": "Action schema.",
      "description": "Action performed by or on the category",
      "name": "action",
      "default": "shortlist",
      "enum": [
        "create",
        "read",
        "update",
        "delete",
        "search",
        "shortlist",
        "apply",
        "verification",
        "reference",
        "withdraw",
        "place",
        "reject",
        "fill",
        "close",
        "cancel",
        "post"
      ]
    },
    "level": {
      "id": "http://jsonschema.net/level",
      "type": "integer",
      "title": "Level schema.",
      "description": "Indicates privalage level of information.",
      "name": "level",
      "default": 3,
      "enum": [
        1,
        2,
        3,
        4,
        5
      ]
    },
    "timestamp": {
      "id": "http://jsonschema.net/timestamp",
      "type": "number",
      "title": "Timestamp schema.",
      "description": "Date and time on which the action happened",
      "name": "timestamp",
      "minimum": 0
    },
    "source": {
      "id": "http://jsonschema.net/source",
      "type": "string",
      "title": "Source schema.",
      "description": "Action source.",
      "name": "source",
      "enum": [
        "people bank",
        "rms",
        "jp",
        "people fluent",
        "elms"
      ]
    },
    "data": {
      "id": "http://jsonschema.net/data",
      "type": "object",
      "title": "Data schema.",
      "description": "Any aditional information that need to be logged.",
      "name": "data",
      "properties": {
        "user": {
          "id": "http://jsonschema.net/data/user",
          "type": "object",
          "title": "User schema.",
          "description": "Additional user data that need to be captured.",
          "name": "user",
          "properties": {
            "id": {
              "id": "http://jsonschema.net/data/user/id",
              "type": "integer",
              "title": "Id schema.",
              "description": "id of the user making changes to the data.",
              "name": "id"
            },
            "name": {
              "id": "http://jsonschema.net/data/user/name",
              "type": "string",
              "title": "Name schema.",
              "description": "Name of the user making data changes.",
              "name": "name"
            }
          },
          "required": [
            "id",
            "name"
          ]
        },
        "client": {
          "id": "http://jsonschema.net/data/client",
          "type": "object",
          "title": "Client schema.",
          "description": "Additional client data that need to be captured.",
          "name": "client",
          "properties": {
            "id": {
              "id": "http://jsonschema.net/data/client/id",
              "type": "integer",
              "title": "Id schema.",
              "description": "client id.",
              "name": "id"
            },
            "name": {
              "id": "http://jsonschema.net/data/client/name",
              "type": "string",
              "title": "Name schema.",
              "description": "Client name.",
              "name": "name"
            }
          },
          "required": [
            "id",
            "name"
          ]
        }
      }
    }
  },
  "required": [
    "category",
    "action",
    "level",
    "id",
    "timestamp",
    "source"
  ]
}
