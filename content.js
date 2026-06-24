console.log("LinkedIn AI Extension Running");

function injectButtons() {

  // Find all comment buttons
  const commentButtons = [...document.querySelectorAll("button")]
    .filter(btn =>
      btn.innerText &&
      btn.innerText.includes("Comment")
    );

  console.log("Comment buttons found:", commentButtons.length);

  commentButtons.forEach((commentBtn) => {

    // Avoid duplicates
    const parent = commentBtn.parentElement;

    if (!parent || parent.querySelector(".ai-comment-btn"))
      return;

    // Create AI button
    const aiBtn = document.createElement("button");

    aiBtn.innerText = "✨ AI Comment";
    aiBtn.className = "ai-comment-btn";

    // Style
    aiBtn.style.marginLeft = "8px";
    aiBtn.style.padding = "6px 12px";
    aiBtn.style.border = "none";
    aiBtn.style.borderRadius = "20px";
    aiBtn.style.background = "#0a66c2";
    aiBtn.style.color = "white";
    aiBtn.style.cursor = "pointer";
    aiBtn.style.fontWeight = "600";

    aiBtn.onclick = async () => {

      // Find nearby post container
      const post =
        commentBtn.closest("div[data-urn]") ||
        commentBtn.closest("article") ||
        document.body;

      const postText = post.innerText.slice(0, 1500);

      console.log("Post text:", postText);

      // Generate AI comment
      const response = await chrome.runtime.sendMessage({
        type: "GENERATE_COMMENT",
        payload: postText
      });

      // Open comment editor
      commentBtn.click();

      // Wait for editor
      setTimeout(() => {

        const editor = post.querySelector(
          '[contenteditable="true"]'
        );

        if (editor) {

          editor.focus();

          document.execCommand(
            "insertText",
            false,
            response
          );

        } else {
          alert("Editor not found");
        }

      }, 1200);
    };

    // Insert beside comment button
    parent.appendChild(aiBtn);

  });
}

// Re-run because LinkedIn dynamically rerenders
setInterval(injectButtons, 3000);