$(function() { // Means when DOM components are loaded
        

                $("#navbarToggle").blur(function(event) {
                                console.log("Lost Focus");
                                let screenWidth = window.innerWidth;
                                let breakPoint = 992;
                                if (screenWidth < breakPoint) {
                                        $("#navbarNavAltMarkup").collapse('hide');
                                }
                        }
                );
                
          
});


(function(global){
        let tinsae = {};
        let homeHTML = "snippets/home-snippet.html";
        
        let insertHTML = function(selector, html) {
                let targetElement = document.querySelector(selector);
                targetElement.innerHTML = html;
        }

        let showLoading = function(selector) {
                let html = `<div class='text-cener'>
                                <img src="images/ajax-loader.gif"/>
                            </div>`;
                insertHTML(selector, html);
        }

        document.addEventListener("DOMContentLoaded", function(event) {
                showLoading("#main-content");
                $ajaxUtils.sendGetRequest(
                        homeHTML, 
                        function(responseText) {
                                document.querySelector("#main-content")
                                .innerHTML = responseText;
                        }, 
                        false
                )

        });

        global.$tinsae = tinsae;
        // Whatever we are going to attach to tinsae will be exposed to a global scope;

})(window);
