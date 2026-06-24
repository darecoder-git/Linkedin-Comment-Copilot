const OPENAI_API_KEY = "YOUR_API_KEY_HERE";


chrome.runtime.onMessage.addListener(async (req, sender, sendResponse) => {
  if (req.type === "GENERATE_COMMENT") {


    chrome.storage.sync.get(["tone"], async (result) => {
      const tone = result.tone || "insightful";




         // create the prompt for AI
      const prompt = `
      Write a LinkedIn comment in a ${tone} tone.

      Rules:
      - Add new insight
      - 2-3 lines
      - Avoid generic praise
      - Sound natural
   
      Post:
      ${req.payload}
      `;




      // post and get the completion from AI
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer ${OPENAI_API_KEY}",
          "Content-Type": "application/json"
        },

        // send prompt here
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7
        })
      });

      // get the data 
      const data = await res.json();
      const comment = data.choices[0].message.content;

      sendResponse(comment);
    });

    return true; // IMPORTANT (async response)
  }
});