const apiKey = 'AIzaSyAuSuEbMiIpdZi8oxqvGr2U9uxl6BXg_cM';

function translateText() {
  const sourceText = document.getElementById("sourceText").value;
  const targetLanguage = document.getElementById("targetLanguage").value;

  google.language.translate(sourceText, targetLanguage, apiKey, function(result) {
    if (result.error) {
      console.error("Error:", result.error);
      document.getElementById("translationResult").innerHTML = "Translation failed.";
    } else {
      document.getElementById("translationResult").innerHTML = result.translation;
    }
  });
}