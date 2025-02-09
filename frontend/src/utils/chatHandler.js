let chatProgress = 0; // Track which question user is answering
let storedAnswers = []; // Store user responses
let isAIEnabled = false; // Track if AI chat is enabled

const initialMessages = [
  "Before we get started, I want you to deploy your personalized bot. Go to settings and deploy it."
];

const questions = [
  "",
  "What is your name?",
  // "What social media platforms do you use the most?",
  // "How frequently do you post on social media?",
  // "What is your primary goal with social media?",
  // "What type of content do you create?",
  // "Do you use any scheduling tools?",
  // "Do you collaborate with others on content?",
  // "How do you measure your success?",
  // "Do you monetize your social media?",
  // "Are you open to AI-powered automation?",
  // "Any specific challenges you face?"
];

export const handleChatResponse = async (message, selectedModel) => {
  // Handle initial messages
  if (chatProgress < initialMessages.length) {
    return initialMessages[chatProgress++];
  }

  // Store user responses in JSON format
  if (chatProgress >= initialMessages.length && chatProgress - initialMessages.length < questions.length) {
    storedAnswers.push({ question: questions[chatProgress - initialMessages.length], answer: message });

    chatProgress++; // Move to the next question

    // If all questions are answered, show completion message
    if (chatProgress - initialMessages.length === questions.length) {
      isAIEnabled = true;
      return "Thank you for answering all the questions. Now it's time to get started! Enter /start to control your bot.";
    }

    return questions[chatProgress - initialMessages.length]; // Ask next question
  }

  // Enable AI chat when form is completed
  if (message === "/start") {
    isAIEnabled = true;
    return "Great! Your AI assistant is now ready. Start giving commands.";
  }

  // If AI mode is enabled, pass message to AI API with the selected model
  if (isAIEnabled) {
    return await fetchAIResponse(message, selectedModel);
  }

  return "I didn't understand that. Please enter /start to begin commanding your bot.";
};

// **AI API Call**
const fetchAIResponse = async (message, model) => {
  try {
    const response = await fetch("https://autonome.alt.technology/marketai-sbqzos/run-campaign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ context: message, llm_type: "openai" })
    });

    const data = await response.json();
    console.log(data);
    return data ;
    // return {
    //   "result": [
    //     {
    //       "content": "content='### Plan for Twitter Engagement and Views\\n\\n#### Objective:\\nIncrease engagement and views on the Twitter account using onchain activity.\\n\\n#### Tools to Use:\\n- `request_faucet_funds`\\n- `deploy_token`\\n- `post_tweet`\\n\\n#### Steps:\\n\\n1. **Request Faucet Funds:**\\n   - Use `request_faucet_funds` to get ETH and USDC for the wallet.\\n\\n2. **Deploy Token:**\\n   - Use `deploy_token` to deploy a new ERC20 token with a unique name and symbol.\\n\\n3. **Post Tweet:**\\n   - Craft a tweet announcing the deployment of the new ERC20 token.\\n   - Include the token name, symbol, and a brief description.\\n   - Use `post_tweet` to publish the tweet.\\n\\n#### Sequence:\\n\\n1. **Request Faucet Funds:**\\n   python\\n   request_faucet_funds(asset_id=\\'eth\\')\\n   request_faucet_funds(asset_id=\\'usdc\\')\\n   \\n\\n2. **Deploy Token:**\\n   python\\n   deploy_token(token_name=\\'Web3Coin\\', symbol=\\'W3C\\', total_supply=1000000)\\n   \\n\\n3. **Post Tweet:**\\n   python\\n   tweet_text = \"Exciting news! We\\'ve just deployed our new ERC20 token, Web3Coin (W3C), on the Base Sepolia network. Stay tuned for more updates! #Web3 #Crypto\"\\n   post_tweet(tweet_text)\\n   \\n\\n#### Example Tweet:\\n\"Exciting news! We\\'ve just deployed our new ERC20 token, Web3Coin (W3C), on the Base Sepolia network. Stay tuned for more updates! #Web3 #Crypto\"\\n\\nThis plan ensures a straightforward approach to increasing engagement and views by leveraging onchain activity and a single, impactful tweet.' additional_kwargs={} response_metadata={'token_usage': {'prompt_tokens': 13210, 'total_tokens': 13610, 'completion_tokens': 400}, 'model': 'mistral-small-latest', 'finish_reason': 'stop'} id='run-93070353-db1c-4677-b8e3-b40b1b24a21c-0' usage_metadata={'input_tokens': 13210, 'output_tokens': 400, 'total_tokens': 13610}",
    //       "additional_kwargs": {},
    //       "response_metadata": {},
    //       "type": "human",
    //       "name": null,
    //       "id": "4d0e8014-26bf-4dc9-bd0f-0d93c22be987",
    //       "example": false
    //     },
    //     {
    //       "content": "",
    //       "additional_kwargs": {
    //         "tool_calls": [
    //           {
    //             "id": "call_EmdAkQsd9mBVikp1bAkq0UaP",
    //             "function": {
    //               "arguments": "{\"asset_id\": \"eth\"}",
    //               "name": "request_faucet_funds"
    //             },
    //             "type": "function"
    //           },
    //           {
    //             "id": "call_MdE85M73MrrzPxUGke7lNOZN",
    //             "function": {
    //               "arguments": "{\"asset_id\": \"usdc\"}",
    //               "name": "request_faucet_funds"
    //             },
    //             "type": "function"
    //           }
    //         ],
    //         "refusal": null
    //       },
    //       "response_metadata": {
    //         "token_usage": {
    //           "completion_tokens": 56,
    //           "prompt_tokens": 5760,
    //           "total_tokens": 5816,
    //           "completion_tokens_details": {
    //             "accepted_prediction_tokens": 0,
    //             "audio_tokens": 0,
    //             "reasoning_tokens": 0,
    //             "rejected_prediction_tokens": 0
    //           },
    //           "prompt_tokens_details": {
    //             "audio_tokens": 0,
    //             "cached_tokens": 0
    //           }
    //         },
    //         "model_name": "gpt-4o-mini-2024-07-18",
    //         "system_fingerprint": "fp_bd83329f63",
    //         "finish_reason": "tool_calls",
    //         "logprobs": null
    //       },
    //       "type": "ai",
    //       "name": null,
    //       "id": "run-f150ad2b-e560-47a9-9b84-7cdbce7ab07e-0",
    //       "example": false,
    //       "tool_calls": [
    //         {
    //           "name": "request_faucet_funds",
    //           "args": {
    //             "asset_id": "eth"
    //           },
    //           "id": "call_EmdAkQsd9mBVikp1bAkq0UaP",
    //           "type": "tool_call"
    //         },
    //         {
    //           "name": "request_faucet_funds",
    //           "args": {
    //             "asset_id": "usdc"
    //           },
    //           "id": "call_MdE85M73MrrzPxUGke7lNOZN",
    //           "type": "tool_call"
    //         }
    //       ],
    //       "invalid_tool_calls": [],
    //       "usage_metadata": {
    //         "input_tokens": 5760,
    //         "output_tokens": 56,
    //         "total_tokens": 5816,
    //         "input_token_details": {
    //           "audio": 0,
    //           "cache_read": 0
    //         },
    //         "output_token_details": {
    //           "audio": 0,
    //           "reasoning": 0
    //         }
    //       }
    //     },
    //     {
    //       "content": "Received usdc from the faucet. Transaction: https://sepolia.basescan.org/tx/0x16872634d6ebb404ecdea2ca5e67432a4322e41cdbe199a323246cc69b9496e9",
    //       "additional_kwargs": {},
    //       "response_metadata": {},
    //       "type": "tool",
    //       "name": "request_faucet_funds",
    //       "id": "984ab968-89ca-49ca-97ec-b8e85baf5220",
    //       "tool_call_id": "call_MdE85M73MrrzPxUGke7lNOZN",
    //       "artifact": null,
    //       "status": "success"
    //     },
    //     {
    //       "content": "",
    //       "additional_kwargs": {
    //         "tool_calls": [
    //           {
    //             "id": "call_HQE30RYsUAdNBUnLNCfgLfeX",
    //             "function": {
    //               "arguments": "{\"name\":\"Web3Coin\",\"symbol\":\"W3C\",\"total_supply\":\"1000000\"}",
    //               "name": "deploy_token"
    //             },
    //             "type": "function"
    //           }
    //         ],
    //         "refusal": null
    //       },
    //       "response_metadata": {
    //         "token_usage": {
    //           "completion_tokens": 30,
    //           "prompt_tokens": 5946,
    //           "total_tokens": 5976,
    //           "completion_tokens_details": {
    //             "accepted_prediction_tokens": 0,
    //             "audio_tokens": 0,
    //             "reasoning_tokens": 0,
    //             "rejected_prediction_tokens": 0
    //           },
    //           "prompt_tokens_details": {
    //             "audio_tokens": 0,
    //             "cached_tokens": 5760
    //           }
    //         },
    //         "model_name": "gpt-4o-mini-2024-07-18",
    //         "system_fingerprint": "fp_bd83329f63",
    //         "finish_reason": "tool_calls",
    //         "logprobs": null
    //       },
    //       "type": "ai",
    //       "name": null,
    //       "id": "run-419e9e1d-e84d-4c00-a9ec-9449b9eb7acf-0",
    //       "example": false,
    //       "tool_calls": [
    //         {
    //           "name": "deploy_token",
    //           "args": {
    //             "name": "Web3Coin",
    //             "symbol": "W3C",
    //             "total_supply": "1000000"
    //           },
    //           "id": "call_HQE30RYsUAdNBUnLNCfgLfeX",
    //           "type": "tool_call"
    //         }
    //       ],
    //       "invalid_tool_calls": [],
    //       "usage_metadata": {
    //         "input_tokens": 5946,
    //         "output_tokens": 30,
    //         "total_tokens": 5976,
    //         "input_token_details": {
    //           "audio": 0,
    //           "cache_read": 5760
    //         },
    //         "output_token_details": {
    //           "audio": 0,
    //           "reasoning": 0
    //         }
    //       }
    //     },
    //     {
    //       "content": "Deployed ERC20 token contract Web3Coin (W3C) with total supply of 1000000 tokens at address 0xfd559A33f5fD50dfbe516DF6cEF53F7558E19b82. Transaction link: https://sepolia.basescan.org/tx/0x4b63399f4e02efa2778da1a5eef16d698ef0d85c28328af6cf22cb990ab3427b",
    //       "additional_kwargs": {},
    //       "response_metadata": {},
    //       "type": "tool",
    //       "name": "deploy_token",
    //       "id": "a985869f-35f6-46f3-a60d-7720ceda048a",
    //       "tool_call_id": "call_HQE30RYsUAdNBUnLNCfgLfeX",
    //       "artifact": null,
    //       "status": "success"
    //     },
    //     {
    //       "content": "",
    //       "additional_kwargs": {
    //         "tool_calls": [
    //           {
    //             "id": "call_MkMuxw0Yc4rzvnywRvXgFTvG",
    //             "function": {
    //               "arguments": "{\"tweet\":\"Exciting news! We've just deployed our new ERC20 token, Web3Coin (W3C), on the Base Sepolia network. Stay tuned for more updates! #Web3 #Crypto\"}",
    //               "name": "post_tweet"
    //             },
    //             "type": "function"
    //           }
    //         ],
    //         "refusal": null
    //       },
    //       "response_metadata": {
    //         "token_usage": {
    //           "completion_tokens": 54,
    //           "prompt_tokens": 6088,
    //           "total_tokens": 6142,
    //           "completion_tokens_details": {
    //             "accepted_prediction_tokens": 0,
    //             "audio_tokens": 0,
    //             "reasoning_tokens": 0,
    //             "rejected_prediction_tokens": 0
    //           },
    //           "prompt_tokens_details": {
    //             "audio_tokens": 0,
    //             "cached_tokens": 5888
    //           }
    //         },
    //         "model_name": "gpt-4o-mini-2024-07-18",
    //         "system_fingerprint": "fp_bd83329f63",
    //         "finish_reason": "tool_calls",
    //         "logprobs": null
    //       },
    //       "type": "ai",
    //       "name": null,
    //       "id": "run-bb9046e0-c5a5-4433-9261-0a7d5ce7e7d3-0",
    //       "example": false,
    //       "tool_calls": [
    //         {
    //           "name": "post_tweet",
    //           "args": {
    //             "tweet": "Exciting news! We've just deployed our new ERC20 token, Web3Coin (W3C), on the Base Sepolia network. Stay tuned for more updates! #Web3 #Crypto"
    //           },
    //           "id": "call_MkMuxw0Yc4rzvnywRvXgFTvG",
    //           "type": "tool_call"
    //         }
    //       ],
    //       "invalid_tool_calls": [],
    //       "usage_metadata": {
    //         "input_tokens": 6088,
    //         "output_tokens": 54,
    //         "total_tokens": 6142,
    //         "input_token_details": {
    //           "audio": 0,
    //           "cache_read": 5888
    //         },
    //         "output_token_details": {
    //           "audio": 0,
    //           "reasoning": 0
    //         }
    //       }
    //     },
    //     {
    //       "content": "Successfully posted to Twitter:\n{\"data\": {\"text\": \"Exciting news! We've just deployed our new ERC20 token, Web3Coin (W3C), on the Base Sepolia network. Stay tuned for more updates! #Web3 #Crypto\", \"edit_history_tweet_ids\": [\"1888207415536955776\"], \"id\": \"1888207415536955776\"}}",
    //       "additional_kwargs": {},
    //       "response_metadata": {},
    //       "type": "tool",
    //       "name": "post_tweet",
    //       "id": "9bf19371-4f62-4bcc-b1e2-772df9dac6c3",
    //       "tool_call_id": "call_MkMuxw0Yc4rzvnywRvXgFTvG",
    //       "artifact": null,
    //       "status": "success"
    //     },
    //     {
    //       "content": "",
    //       "additional_kwargs": {
    //         "tool_calls": [
    //           {
    //             "id": "call_DdGLP52OpufcWFelV09JFuF3",
    //             "function": {
    //               "arguments": "{\"tweet_id\":\"1888207415536955776\"}",
    //               "name": "log_tweet"
    //             },
    //             "type": "function"
    //           }
    //         ],
    //         "refusal": null
    //       },
    //       "response_metadata": {
    //         "token_usage": {
    //           "completion_tokens": 23,
    //           "prompt_tokens": 6230,
    //           "total_tokens": 6253,
    //           "completion_tokens_details": {
    //             "accepted_prediction_tokens": 0,
    //             "audio_tokens": 0,
    //             "reasoning_tokens": 0,
    //             "rejected_prediction_tokens": 0
    //           },
    //           "prompt_tokens_details": {
    //             "audio_tokens": 0,
    //             "cached_tokens": 6016
    //           }
    //         },
    //         "model_name": "gpt-4o-mini-2024-07-18",
    //         "system_fingerprint": "fp_bd83329f63",
    //         "finish_reason": "tool_calls",
    //         "logprobs": null
    //       },
    //       "type": "ai",
    //       "name": null,
    //       "id": "run-9dc8126c-b635-40a2-9fc5-0b7b2de20fdd-0",
    //       "example": false,
    //       "tool_calls": [
    //         {
    //           "name": "log_tweet",
    //           "args": {
    //             "tweet_id": "1888207415536955776"
    //           },
    //           "id": "call_DdGLP52OpufcWFelV09JFuF3",
    //           "type": "tool_call"
    //         }
    //       ],
    //       "invalid_tool_calls": [],
    //       "usage_metadata": {
    //         "input_tokens": 6230,
    //         "output_tokens": 23,
    //         "total_tokens": 6253,
    //         "input_token_details": {
    //           "audio": 0,
    //           "cache_read": 6016
    //         },
    //         "output_token_details": {
    //           "audio": 0,
    //           "reasoning": 0
    //         }
    //       }
    //     },
    //     {
    //       "content": "Logged tweet 1888207415536955776 added for tracking and analysing . . . ",
    //       "additional_kwargs": {},
    //       "response_metadata": {},
    //       "type": "tool",
    //       "name": "log_tweet",
    //       "id": "1e5d2566-de08-4d3c-bb3a-273c021525cf",
    //       "tool_call_id": "call_DdGLP52OpufcWFelV09JFuF3",
    //       "artifact": null,
    //       "status": "success"
    //     },
    //     {
    //       "content": "### Campaign Summary\n\n1. **Faucet Funds Received:**\n   - Successfully received **ETH** from the faucet. [Transaction Link](https://sepolia.basescan.org/tx/0x12386a680b2d100b69f6e12d28d2888ba31ba7e6faaf2caa3b77a0460f184beb)\n   - Successfully received **USDC** from the faucet. [Transaction Link](https://sepolia.basescan.org/tx/0x16872634d6ebb404ecdea2ca5e67432a4322e41cdbe199a323246cc69b9496e9)\n\n2. **Token Deployment:**\n   - Deployed the new ERC20 token **Web3Coin (W3C)** with a total supply of **1,000,000** tokens.\n   - [Transaction Link for Deployment](https://sepolia.basescan.org/tx/0x4b63399f4e02efa2778da1a5eef16d698ef0d85c28328af6cf22cb990ab3427b)\n\n3. **Tweet Posted:**\n   - Successfully tweeted: \"Exciting news! We've just deployed our new ERC20 token, Web3Coin (W3C), on the Base Sepolia network. Stay tuned for more updates! #Web3 #Crypto\".\n   - Tweet ID: **1888207415536955776** has been logged for tracking and analysis.\n\n### Importance of the Steps Taken\n- **Faucet Funds:** By acquiring faucet funds, we've ensured that our wallet has enough liquidity to engage in further transactions and operations within the campaign.\n- **Token Deployment:** Deploying the new token creates a tangible asset for our community and provides a basis for future interactions, incentivizing community involvement.\n- **Social Media Engagement:** The tweet serves to inform and attract attention to our new token, increasing visibility and engagement which are crucial for building a strong community.\n\nThis structured approach ensures that we effectively utilize onchain activities to boost engagement and visibility for the campaign.",
    //       "additional_kwargs": {
    //         "refusal": null
    //       },
    //       "response_metadata": {
    //         "token_usage": {
    //           "completion_tokens": 442,
    //           "prompt_tokens": 6280,
    //           "total_tokens": 6722,
    //           "completion_tokens_details": {
    //             "accepted_prediction_tokens": 0,
    //             "audio_tokens": 0,
    //             "reasoning_tokens": 0,
    //             "rejected_prediction_tokens": 0
    //           },
    //           "prompt_tokens_details": {
    //             "audio_tokens": 0,
    //             "cached_tokens": 6144
    //           }
    //         },
    //         "model_name": "gpt-4o-mini-2024-07-18",
    //         "system_fingerprint": "fp_bd83329f63",
    //         "finish_reason": "stop",
    //         "logprobs": null
    //       },
    //       "type": "ai",
    //       "name": null,
    //       "id": "run-07b8b312-c13d-4d06-a1b7-43d772fa4751-0",
    //       "example": false,
    //       "tool_calls": [],
    //       "invalid_tool_calls": [],
    //       "usage_metadata": {
    //         "input_tokens": 6280,
    //         "output_tokens": 442,
    //         "total_tokens": 6722,
    //         "input_token_details": {
    //           "audio": 0,
    //           "cache_read": 6144
    //         },
    //         "output_token_details": {
    //           "audio": 0,
    //           "reasoning": 0
    //         }
    //       }
    //     }
    //   ]
    // };
  } catch (error) {
    console.error("AI API Error:", error);
    return "Oops! Something went wrong.";
  }
};
