var $$ = (id) => document.getElementById(id);
        langpack = {
            splashscreen: {
                screenstuck: {
                    pl_pl: "Jeszcze chwilka",
                    en: "It's taking longer than usual"
                }
            }
        }
        var lang = "";
        switch (navigator.language) {
            case "pl":
                    lang="pl_pl";
                break;
        
            default:
                lang="en";
                break;
        }