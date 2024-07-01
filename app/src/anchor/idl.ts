export type Ecom = {
  "version": "0.1.0",
  "name": "ecom",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "products",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "addProduct",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "products",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "imageUrl",
          "type": "string"
        },
        {
          "name": "priceInSol",
          "type": "f64"
        }
      ]
    },
    {
      "name": "purchaseProduct",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "products",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "to",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "productIndex",
          "type": "u64"
        }
      ]
    },
    {
      "name": "listProduct",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "products",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "productIndex",
          "type": "u64"
        }
      ]
    },
    {
      "name": "delistProduct",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "products",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "productIndex",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateProductPrice",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "products",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "productIndex",
          "type": "u64"
        },
        {
          "name": "newPriceInSol",
          "type": "f64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "allProducts",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalProducts",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "productsList",
            "type": {
              "vec": {
                "defined": "ItemStruct"
              }
            }
          },
          {
            "name": "admin",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ItemStruct",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "priceInSol",
            "type": "f64"
          },
          {
            "name": "ownerAddress",
            "type": "publicKey"
          },
          {
            "name": "listed",
            "type": "bool"
          }
        ]
      }
    }
  ]
};

export const IDL: Ecom = {
  "version": "0.1.0",
  "name": "ecom",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "products",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "addProduct",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "products",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "imageUrl",
          "type": "string"
        },
        {
          "name": "priceInSol",
          "type": "f64"
        }
      ]
    },
    {
      "name": "purchaseProduct",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "products",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "to",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "productIndex",
          "type": "u64"
        }
      ]
    },
    {
      "name": "listProduct",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "products",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "productIndex",
          "type": "u64"
        }
      ]
    },
    {
      "name": "delistProduct",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "products",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "productIndex",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateProductPrice",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "products",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "productIndex",
          "type": "u64"
        },
        {
          "name": "newPriceInSol",
          "type": "f64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "allProducts",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalProducts",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "productsList",
            "type": {
              "vec": {
                "defined": "ItemStruct"
              }
            }
          },
          {
            "name": "admin",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ItemStruct",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "priceInSol",
            "type": "f64"
          },
          {
            "name": "ownerAddress",
            "type": "publicKey"
          },
          {
            "name": "listed",
            "type": "bool"
          }
        ]
      }
    }
  ]
};
