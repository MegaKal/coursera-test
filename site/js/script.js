$(function() { // Means when DOM components are loaded
        

                $("#navbarToggle").blur(function(event) {
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
        let catagoriesTitleHTML = "snippets/catagories-title-snippet.html";
        let catagoryHTML = "snippets/catagory-snippet.html";
        let allCatagoriesUrl = "data/catagories.json";

        let menuItemUrl = "data/";
        let menuItemsTitleHtml = "snippets/menu-items-title.html";
        let menuItemHtml = "snippets/menu-item.html";
        
        let aboutHtml = "snippets/about-snippet.html";

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

        let insertProperty = function(string, propName, propValue) {
                var propToReplase = "{{" + propName + "}}";
                string = string.replace(new RegExp(propToReplase, "g"), propValue);
                return string;
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

        function switchMenuToActive() {
                // from Home to Menu
                let style_class = document.querySelector("#navHome").className;
                if(style_class.indexOf("active") == -1) {
                        // From About to Menu
                        style_class = document.querySelector("#navAbout").className;
                }
                // Deactivate Home or About
                style_class = style_class.replace(new RegExp("active", "g"), "");
                document.querySelector("#navHome").className = style_class;
                document.querySelector("#navAbout").className = style_class;

                // Activate Menu
                style_class = document.querySelector("#navMenu").className;
                if(style_class.indexOf("active") == -1) {
                        style_class += " active";
                        document.querySelector("#navMenu").className = style_class;
                }
        }


        function switchAboutToActive() {
                // from Home to About
                let style_class = document.querySelector("#navHome").className;
                if(style_class.indexOf("active") == -1) {
                        // From Menu to About
                        style_class = document.querySelector("#navMenu").className;
                }
                // Deactivate Home or Menu
                style_class = style_class.replace(new RegExp("active", "g"), "");
                document.querySelector("#navHome").className = style_class;
                document.querySelector("#navMenu").className = style_class;

                // Activate About
                style_class = document.querySelector("#navAbout").className;
                if(style_class.indexOf("active") == -1) {
                        style_class += " active";
                        document.querySelector("#navAbout").className = style_class;
                }
        }

        tinsae.loadMenuCatagories = function() {
                showLoading("#main-content");
                $ajaxUtils.sendGetRequest(allCatagoriesUrl, buildAndShowCatagoriesHTML);
                switchMenuToActive();
        }

        tinsae.loadAbout = function() {
                showLoading("#main-content");
                switchAboutToActive();
                $ajaxUtils.sendGetRequest(aboutHtml, buildAndShowAboutHTML, false);
        }

        tinsae.loadMenuItems = function(short_name) {
                showLoading("#main-content");
                switchMenuToActive();
                let url = menuItemUrl + short_name + "/menu_items.json";
                $ajaxUtils.sendGetRequest(url, buildAndShowMenuItemsHTML);

        }
        function buildAndShowAboutHTML(response) {   
                 insertHTML("#main-content", response);       
        }

        function buildAndShowCatagoriesHTML(catagories){
                
                
                $ajaxUtils.sendGetRequest(
                        catagoriesTitleHTML,
                        function(catagoriesTitleResponse) {
                                $ajaxUtils.sendGetRequest(
                                        catagoryHTML,
                                        function(catagoryHTMLResponse) {                                      
                                                let catagoriesViewHtml = 
                                                buildCatagoriesViewHtml(catagories, 
                                                        catagoriesTitleResponse,
                                                        catagoryHTMLResponse
                                );
                                insertHTML("#main-content", catagoriesViewHtml);
                                                }, false);
                        },
                        false
                );
        }

        function buildAndShowMenuItemsHTML(catagoryMenuItems) {
                
                $ajaxUtils.sendGetRequest(
                        menuItemsTitleHtml,
                        function(menuItemsTitleHtml) {
                                $ajaxUtils.sendGetRequest(
                                        menuItemHtml,
                                        function(menuItemHtml) {
                                                let menuItemsViewHtml =
                                                        buildMenuItemsViewHtml(catagoryMenuItems,
                                                                menuItemsTitleHtml,
                                                                menuItemHtml);
                                                insertHTML("#main-content", menuItemsViewHtml);
                                        },
                                        false); 
                        },
                        false
                );
        }
       

        function buildCatagoriesViewHtml(catagories, 
                catagoriesTitleHTML,
                catagoryHTML) {
                        
                        let finalHTML = catagoriesTitleHTML;
                        finalHTML += "<section class='row'>";
                        for( let i = 0; i < catagories.length; i++) {
                                let html = catagoryHTML;
                                let name = "" + catagories[i].name;
                                var short_name = catagories[i].short_name;
                                html = insertProperty(html, "name", name);
                                html = insertProperty(html, "short_name", short_name);
                                finalHTML += html;
                        }
                        finalHTML += "</section>";

                        return finalHTML;
                }
        function buildMenuItemsViewHtml(
                categoryMenuItems,
                menuItemsTitleHtml,
                menuItemHtml) {

                                     
                        menuItemsTitleHtml =
                        insertProperty(menuItemsTitleHtml,
                                        "name",
                                        categoryMenuItems[0].catagory);

                        menuItemsTitleHtml =
                        insertProperty(menuItemsTitleHtml,
                                        "special_instructions",
                                        categoryMenuItems[0].special_instructions);

                        var finalHtml = menuItemsTitleHtml;
                        finalHtml += "<section class='row'>";

                        // // Loop over menu items
                        var menuItems = categoryMenuItems;

                        // var catShortName = categoryMenuItems.catagory;
                        for (var i = 0; i < menuItems.length; i++) {
                                // Insert menu item values
                                var html = menuItemHtml;
                                html =
                                insertProperty(html, "id", menuItems[i].id);
                
                                html =
                                insertProperty(html,
                                                "birr",
                                                menuItems[i].price.birr);
                                
                                html =
                                insertProperty(html,
                                                "cent",
                                                menuItems[i].price.cent);
                             
                                html =
                                insertProperty(html,
                                                "name",
                                                menuItems[i].name);
                                html =
                                insertProperty(html,
                                                "description",
                                                menuItems[i].description);
                                                html =
                                insertProperty(html,
                                                "catagory",
                                                menuItems[i].catagory);

                                

                                finalHtml += html;
                        }

                        finalHtml += "</section>";
                        return finalHtml;

                }

        global.$tinsae = tinsae;
        // Whatever we are going to attach to tinsae will be exposed to a global scope;

})(window);
