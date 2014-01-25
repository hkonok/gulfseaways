/**
 * Created by IntelliJ IDEA.
 * Date: 9/1/13
 * Time: 12:58 PM
 * To change this template use File | Settings | File Templates.
 */
var pager = {total:0,limit:5,pageNumber:1,paramMap:{insightsCategoryId:"0"}};

var category_list = ["Articles", "Research", "News", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"];

var keyValue = [];

var paraObj = {};
paraObj["category"] = "All";
paraObj["pageNumber"] = 1;

function parseHashLocation(){
    var hash = location.hash.replace('#', '');
	var paraString = hash.split("$");

    for(i = 0; i< paraString.length; i++){
	    var para = paraString[i].split("=");
		if(para[0]){
			paraObj[para[0]] = para[1];
		}
	}
	return paraString.length;
}

function resetHashLocation(){
	location.hash = "$category="+paraObj["category"]+"$pageNumber="+paraObj["pageNumber"];
}

function dwrInit() {
    d_InsightsService._path = APP_PATH;
    //d_InsightsService._path = "http://localhost:8081/scb/dwr";
	var paraLength = parseHashLocation();
	if(paraLength == 1 && paraObj["category"] == "All"){//the first time to view the insights listing page
		 d_InsightsService.getInsightsCategoryList({callback:_insightsCategoryCallBack});
		 loadPage();
	}else if(paraLength == 4){//user click the back to results link
		initToLoadingPage();
	}else{//user click the category in the insights detail page
	     //loadpage until get category list
		 if(paraObj["category"] != "All"){//user click the category in the insights detail page
			d_InsightsService.getInsightsCategoryList({callback:_insightsCategoryCallBack_loadPage});
		 }else{  //just use default
		 }
	}

    $("#insightsCategory").change(function() {
		paraObj["category"] = getInsightsCategoryText();
		paraObj["pageNumber"] = "1";
		resetHashLocation();
        pager.pageNumber = 1;
        pager.paramMap.insightsCategoryId = getInsightsCategoryId();
        loadPage();
    });

}

function initToLoadingPage(){
    //top nav pagination is not required
	$("#insights-listing-filter-top").empty();
	
	d_InsightsService.getInsightsCategoryList({callback:_insightsCategoryCallBackV2});
}

function _insightsCategoryCallBackV2(insightsCategoryList) {

    $("#insightsCategory").empty();

            radionActive = "radio active selected";
            $("#insightsCategory").append("<li class='" + radionActive + "'>" +
                                      "<input type='radio' id='search-insights-category-0' name='grp-insights-category' checked='checked' value='0'>" +
                                      "<label for='search-insights-category-0'> All </label></li>");


	for (var i = 1; i <= category_list.length; i++) {
   		for (var j = 1; j <= insightsCategoryList.length; j++) {
			if(insightsCategoryList[j - 1].name == category_list[i - 1]){
	 			radionActive = "radio";
                $("#insightsCategory").append("<li class='" + radionActive + "'>" +
                                      "<input type='radio' id='search-insights-category-" + i + "' name='grp-insights-category' value='" + insightsCategoryList[j - 1].id + "'>" +
                                      "<label for='search-insights-category-" + i + "'> " + insightsCategoryList[j - 1].name + " </label></li>");

				 break;
			}
		}
   	}

	var ele = document.getElementsByName("grp-insights-category");
	for (i = 0; i < ele.length; i++) {
	  if (Utils.trim(ele[i].nextSibling.innerHTML) == unescape(paraObj["category"])) {
         DWRUtil.setValue(ele[i].id, true);
      }
    }
    Forms.initFormNavV2($("#form-carousel"));
}

function getUrlVar(){
    return window.location.href.slice(window.location.href.indexOf('?')+1).split('=');
 }

function getInsightsCategoryId() {
    $carousel = $("#form-carousel").find(".viewport").children();
    $selected = $carousel.find("input[name='grp-insights-category']:checked");
    return $selected.val();
}

function getInsightsCategoryText() {
    $carousel = $("#form-carousel").find(".viewport").children();
    $selected = $carousel.find("input[name='grp-insights-category']:checked");
    return Utils.trim($selected[0].nextSibling.innerHTML);
}

function loadPage() {
    pager.list = [];
    d_InsightsService.getPager(pager, {callback:_insightsCallback});
}

function _insightsCategoryCallBack(insightsCategoryList) {
    $("#insightsCategory").empty();

            radionActive = "radio active selected";
            $("#insightsCategory").append("<li class='" + radionActive + "'>" +
                                      "<input type='radio' id='search-insights-category-0' name='grp-insights-category' checked='checked' value='0'>" +
                                      "<label for='search-insights-category-0'> All </label></li>");


	for (var i = 1; i <= category_list.length; i++) {
   		for (var j = 1; j <= insightsCategoryList.length; j++) {
			if(insightsCategoryList[j - 1].name == category_list[i - 1]){
	 			radionActive = "radio";
                $("#insightsCategory").append("<li class='" + radionActive + "'>" +
                                      "<input type='radio' id='search-insights-category-" + i + "' name='grp-insights-category' value='" + insightsCategoryList[j - 1].id + "'>" +
                                      "<label for='search-insights-category-" + i + "'> " + insightsCategoryList[j - 1].name + " </label></li>");

				 break;
			}
		}
   	}

    Forms.initFormNavV2($("#form-carousel"));
}

function _insightsCategoryCallBack_loadPage(insightsCategoryList) {
    $("#insightsCategory").empty();

            radionActive = "radio active selected";
            $("#insightsCategory").append("<li class='" + radionActive + "'>" +
                                      "<input type='radio' id='search-insights-category-0' name='grp-insights-category' checked='checked' value='0'>" +
                                      "<label for='search-insights-category-0'> All </label></li>");


	for (var i = 1; i <= category_list.length; i++) {
   		for (var j = 1; j <= insightsCategoryList.length; j++) {
			if(insightsCategoryList[j - 1].name == category_list[i - 1]){
	 			radionActive = "radio";
                $("#insightsCategory").append("<li class='" + radionActive + "'>" +
                                      "<input type='radio' id='search-insights-category-" + i + "' name='grp-insights-category' value='" + insightsCategoryList[j - 1].id + "'>" +
                                      "<label for='search-insights-category-" + i + "'> " + insightsCategoryList[j - 1].name + " </label></li>");

				 break;
			}
		}
   	}

    Forms.initFormNavV2($("#form-carousel"));

	_byCategory(unescape(paraObj["category"]));


}

function isIE6OR7(){
   if(typeof IE_VERSION === 'undefined'){
   }else{
   return IE_VERSION == "IE6" || IE_VERSION == "IE7";
   }
   return false;
}

function _insightsCallback(insightsPager) {
    
	insightsPagerList = insightsPager.list;
    pager = insightsPager;
    $("#featured-news").empty();
    $("#featured-news").hide();
    $("#recent-news").empty();
    for (i = 0; i < insightsPagerList.length; i++) {
        insightsVO = insightsPagerList[i];
        for (j = 0; j < insightsVO.insightsCategory.length; j++){
            if(j == 0){
                categoryDisplay = "<a href='#' onclick='_byCategory(\"" + insightsVO.insightsCategory[j].name + "\");return false;'>"+ insightsVO.insightsCategory[j].name + "</a>";
            }else{
                categoryDisplay = categoryDisplay +", <a href='#' onclick='_byCategory(\"" + insightsVO.insightsCategory[j].name + "\");return false;'>"+ insightsVO.insightsCategory[j].name + "</a>";;
            }
        }
        if (pager.pageNumber==1 && i<2){
               $("#featured-news").show();
               var item = "";
               item = "<li class='item article' style='padding-right:0px;'> " +
									 "<a href='" + insightsVO.dcrPath.replace(/.xml/,".html") + "'>" +
                                     "<img width='168' height='95' title='" + insightsVO.title + "' alt='" + insightsVO.title + "' src='" + insightsVO.featureImage + "'/></a>" +
									 "<h4><a href='" + insightsVO.dcrPath.replace(/.xml/,".html") + "'>" + insightsVO.title + "</a></h4>" +
									 "<p class='date'>" + dateFormatConvert(insightsVO.publishDate) + "</p>";
               if (insightsVO.description !=null && insightsVO.description !=''){
               item += "<p>" + insightsVO.description + "</p>";
               }

            if (insightsVO.downloadUrl != null && insightsVO.downloadUrl !=''){
                if (insightsVO.downloadLinkText != null && insightsVO.downloadLinkText != ''){
                    item += "<p><a class='cta' href='" + insightsVO.downloadUrl + "'>" + insightsVO.downloadLinkText + "</a></p>";
                }   else{
                    item += "<p><a class='cta' href='" + insightsVO.downloadUrl + "'>Download PDF</a></p>";
                }
            }
            item += "</li>";
             $("#featured-news").append(item);

        }   else{
		if( i == 0){
		    var item = "<li class='item first' style='padding-right: 0px;'> " +
                          "<h3><a href='"+insightsVO.dcrPath.replace(/.xml/, ".html")+"' >"+insightsVO.title+"</a></h3>" +
                          "<div class='item-detail'>" +
                          "<p class='time-stamp'><span class='date'>" + dateFormatConvert(insightsVO.publishDate) + "</span>" + categoryDisplay + "</p>" +
                          "</div>";
			if (insightsVO.description !=null && insightsVO.description !=''){
               item += "<p>" + insightsVO.description + "<a href='"+insightsVO.dcrPath.replace(/.xml/, ".html")+"' class='cta'>&nbsp;</a></p>";
               }
			   
			if (insightsVO.downloadUrl != null && insightsVO.downloadUrl !=''){
                if (insightsVO.downloadLinkText != null && insightsVO.downloadLinkText != ''){
                    item += "<p><a class='cta' href='" + insightsVO.downloadUrl + "'>" + insightsVO.downloadLinkText + "</a></p>";
                }   else{
                    item += "<p><a class='cta' href='" + insightsVO.downloadUrl + "'>Download PDF</a></p>";
                }
            }   
			item += "</li>";
			
			$("#recent-news").append(item);

		}else{
		
			var item = "<li class='item' style='padding-right: 0px;'> " +
                          "<h3><a href='"+insightsVO.dcrPath.replace(/.xml/, ".html")+"' >"+insightsVO.title+"</a></h3>" +
                          "<div class='item-detail'>" +
                          "<p class='time-stamp'><span class='date'>" + dateFormatConvert(insightsVO.publishDate) + "</span>" + categoryDisplay + "</p>" +
                          "</div>";
			if (insightsVO.description !=null && insightsVO.description !=''){
               item += "<p>" + insightsVO.description + "<a href='"+insightsVO.dcrPath.replace(/.xml/, ".html")+"' class='cta'>&nbsp;</a></p>";
               }
			   
			if (insightsVO.downloadUrl != null && insightsVO.downloadUrl !=''){
                if (insightsVO.downloadLinkText != null && insightsVO.downloadLinkText != ''){
                    item += "<p><a class='cta' href='" + insightsVO.downloadUrl + "'>" + insightsVO.downloadLinkText + "</a></p>";
                }   else{
                    item += "<p><a class='cta' href='" + insightsVO.downloadUrl + "'>Download PDF</a></p>";
                }
            }   
			item += "</li>";
			
			$("#recent-news").append(item);
		}
         }
    }
    
	if (pager.total>5){
    $('#pagination-nav-bottom').show();
	_generatePageBar();
	}else{
	$('#pagination-nav-bottom').hide();
	}
	

}

function _byCategory(categoryName){

	var ele = document.getElementsByName("grp-insights-category");
	for (i = 0; i < ele.length; i++) {
	  if (Utils.trim(ele[i].nextSibling.innerHTML) == categoryName) {
         DWRUtil.setValue(ele[i].id, true);
      }
    }
	Forms.initFormNavV2($("#form-carousel"));

	if(categoryName != paraObj["category"]){ //click the region link in one item in the listing page
		paraObj["category"] = categoryName;
		resetHashLocation();
		pager.pageNumber = 1;
	}else{
	    pager.pageNumber = paraObj["pageNumber"];
	}

	pager.paramMap.insightsCategoryId = getInsightsCategoryId();
	loadPage();
}

function _gotoNextPage(pager, page) {
    pager.pageNumber = page;
    loadPage();
}

function _generatePageBar() {
    var navigatePageNumbers = pager.navigatePageNumbers;
    var navigatePageNumbersLi = "";
    for (var i = 0; i < navigatePageNumbers.length; i++) {
        if (navigatePageNumbers[i] == pager.pageNumber) {
            navigatePageNumbersLi = navigatePageNumbersLi + "<li class='selected'><a href='#' onClick='gotoNextPage("+navigatePageNumbers[i] + ");return false;'>" + navigatePageNumbers[i] + "</a></li> "
        } else if (i == navigatePageNumbers.length - 1) {
            navigatePageNumbersLi = navigatePageNumbersLi + "<li class='last'><a href='#' onClick='gotoNextPage("+navigatePageNumbers[i] + ");return false;'>" + navigatePageNumbers[i] + "</a></li> "
        } else {
            navigatePageNumbersLi = navigatePageNumbersLi + "<li><a href='#' onClick='gotoNextPage("+navigatePageNumbers[i] + ");return false;'>" + navigatePageNumbers[i] + "</a></li> "
        }
    }
    //_appendPageBar($("#pagination-nav-top"), navigatePageNumbersLi);
    _appendPageBar($("#pagination-nav-bottom"), navigatePageNumbersLi);
}

function gotoNextPage(page) {

    if (page > pager.pages || page < 1) {
        return;
    }
	paraObj["pageNumber"] = page;
	resetHashLocation();
    pager.pageNumber = page;
    loadPage();
}

function dateFormatConvert(str){ //convert str from yyyy-dd-mm to dd/mm/yyyy
	var ele = str.split("-");
	if(ele.length == 3){
		return ele[2]+"/"+ele[1]+"/"+ele[0];
	}
	return str;
}

function _appendPageBar(elmentToAppend, navigatePageNumbersLi) {
    elmentToAppend.empty();
    elmentToAppend.append(
            "<ul class='pagination-nav'>" +
            "<li class='prev-page'><a href='#' onClick='gotoNextPage(" + (pager.pageNumber - 1) + ");return false;'>&lt;</a></li> " +
            "<li class='index'>" +
            "<ul>" + navigatePageNumbersLi +

            "</ul>" +
            "</li>" +
            "<li class='next-page'><a href='#' onClick='gotoNextPage(" + (pager.pageNumber + 1) + ");return false;'>&gt;</a></li>" +
            "<li class='first-page'><a href='#' onClick='gotoNextPage(" + 1 + ");return false;'>|&lt;</a></li>" +
            "<li class='last-page'><a href='#' onClick='gotoNextPage(" + pager.pages + ");return false;'>&gt;|</a></li>" +
            "</ul>" +
            "<p class='pagination-range'>Displaying <span id='range-min'>" +
            (pager.total > 0 ? ((pager.pageNumber - 1) * pager.limit + 1): 0) +
            "</span> to  <span id='range-max'>" +
            (pager.total < pager.pageNumber * pager.limit ? pager.total : pager.pageNumber * pager.limit) +
            "</span> of " +
            "<span id='total-set'>" +
            pager.total +
            "</span> matches " +
            "</p>");
}
