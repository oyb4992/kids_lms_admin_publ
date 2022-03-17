function getUrlParam(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function() {
    if(getUrlParam("iframeId")){
        if(getUrlParam("iframeId")=="curriculum_form" || getUrlParam("iframeId")=="curriculum_setting" || getUrlParam("iframeId")=="parents_info" || getUrlParam("iframeId")=="parents_banner" || getUrlParam("iframeId")=="pet_setting" || getUrlParam("iframeId")=="pet_list" || getUrlParam("iframeId")=="phrase_setting"){
            $("#wrap_container").attr("src", "./html/lms/" + getUrlParam("iframeId") + ".html");
        }   
    }
});