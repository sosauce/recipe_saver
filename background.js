chrome.commands.onCommand.addListener(function(command) {
    if (command === "save_recipe") {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        console.log("Saving recipe from tab: " + activeTab.url);
        chrome.tabs.sendMessage(activeTab.id, {message: "save_recipe"}, function(response) {
          var recipe = response.recipe;
          var filename = "recipe.txt";
          var desktopPath = "~/Desktop/Recettes/";
          var blob = new Blob([recipe], {type: "text/plain"});
          var file = new File([blob], filename);
          var a = document.createElement("a");
          a.href = URL.createObjectURL(file);
          a.download = filename;
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(a.href);
          console.log("Recipe saved to: " + desktopPath + filename);
        });
      });
    }
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "get_recipe") {
      var recipe = "";
      // TODO: Extract the recipe from the page and store it in the "recipe" variable
      sendResponse({recipe: recipe});
    }
  });
  