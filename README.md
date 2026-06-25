# LinkedIn Comment Copilot (Chrome Extension)
AI-assisted tool to generate contextual, tone-controlled comments for social engagement



## Step 1: Load Extension
Go to chrome://extensions
Enable Developer Mode
Click Load unpacked
Select your folder

## Step 2: Test
Open LinkedIn feed
Click “Comment” on a post
Click 'AI Comment'
Boom → generated comment appears


# Important Fixes (you WILL hit these)
1. Comment box selector issues
LinkedIn DOM changes a lot → you may need:
document.querySelector('.comments-comment-box__contenteditable')
2. CORS / API issues
If fetch fails:
Move API call to backend (Node server)
Or use proxy
3. Rate limits
Add debounce:
if (window.loading) return;
window.loading = true;

## 🔍 Debug Quickly
Open DevTools on LinkedIn:
Right click → Inspect → Console
Add this temporarily at top of injectButtons():
console.log("Running inject...");


