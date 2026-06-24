document.addEventListener("DOMContentLoaded", () => {
  const toneSelect = document.getElementById("tone");

  // Load saved tone
  chrome.storage.sync.get(["tone"], (result) => {
    if (result.tone) {
      toneSelect.value = result.tone;
    }
  });

  // Save tone on change
  toneSelect.addEventListener("change", () => {
    const selectedTone = toneSelect.value;

    chrome.storage.sync.set({ tone: selectedTone });
  });
});