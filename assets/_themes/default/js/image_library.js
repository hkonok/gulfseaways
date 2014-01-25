/**
 * Date: 11-8-29
 * Time: PM 10:17
 */
 
//category list need to display 
var category_list = ["People","Our offices", "Liverpool Football Club", "Marathons"];
  
var pager = {limit:6, pageNumber:1, navigatePages:4, paramMap:{}};

var keyValue = [];

var paraObj = {};
paraObj["category"] = "Please select a collection";
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
	location.hash = "category="+paraObj["category"]+"$pageNumber="+paraObj["pageNumber"];
}
function dwrInit(){
    d_ImageService._path= APP_PATH;
	var paraLength = parseHashLocation();
	if(paraLength == 1 && paraObj["category"] == "Please select a collection"){//the first time to view the news listing page
		 d_ImageService.getCategoryList({callback:categoryCallBack});
		 //initPageFields();
		 loadPage();
	}else if(paraLength == 2){//user click the back to results link 
		d_ImageService.getCategoryList({callback:categoryCallBackV2});
	}else{//user click the category in the news detail page
	     //loadpage until get category list 
			if(paraObj["category"] != "Please select a collection"){
				d_ImageService.getCategoryList({callback:categoryCallBackV2});
			}	 
	}
	
	initPageFields();
}


function getUrlVar(){
   return window.location.href.slice(window.location.href.indexOf('?')+1).split('=');
}

function isIE6OR7(){
   if(typeof IE_VERSION === 'undefined'){
   }else{
   return IE_VERSION == "IE6" || IE_VERSION == "IE7";    
   }
   return false;
}


function loadCategory(){
    d_ImageService.getCategoryList({callback:categoryCallBack});
}

function categoryCallBack(categoryList){
    $("#search-il-byCollection").empty();
    $("#search-il-byCollection").append("<option value=''>Please select a collection</option>");
    $("#search-il-byCollection").append("<option value=''>All images</option>");
    
    /*for(var i = 0; i < categoryList.length; i++){
            if(jQuery.inArray(categoryList[i].name, category_list) >= 0){
			$("#search-il-byCollection").append("<option value='"+categoryList[i].id +"'>" + categoryList[i].name + "</option>");
		}
    }*/

    for (var i = 1; i <= category_list.length; i++) {
   		for (var j = 1; j <= categoryList.length; j++) {
			if(categoryList[j - 1].name.toLowerCase() === category_list[i - 1].toLowerCase()){
	 		    DWRUtil.addOptions("search-il-byCollection", [{id: categoryList[j - 1].id , name:category_list[i - 1]}], "id", "name");
			}
		}
    }

  
   

    if(isIE6OR7()){
    }else{
      $("#search-il-byCollection").resetSS();
    }


    /*if(keyValue.length == 2){
       if(keyValue[0] == "category"){
	     _byCategory(unescape(keyValue[1]));
	 }
    } */

    
}

function categoryCallBackV2(categoryList){

    $("#search-il-byCollection").empty();
    $("#search-il-byCollection").append("<option value=''>Please select a collection</option>");
    $("#search-il-byCollection").append("<option value=''>All images</option>");
    
    /*for(var i = 0; i < categoryList.length; i++){
            if(jQuery.inArray(categoryList[i].name, category_list) >= 0){
			$("#search-il-byCollection").append("<option value='"+categoryList[i].id +"'>" + categoryList[i].name + "</option>");
		}
    }*/
	

    for (var i = 1; i <= category_list.length; i++) {
   		for (var j = 1; j <= categoryList.length; j++) {
			if(categoryList[j - 1].name.toLowerCase() === category_list[i - 1].toLowerCase()){
	 		    DWRUtil.addOptions("search-il-byCollection", [{id: categoryList[j - 1].id , name:category_list[i - 1]}], "id", "name");
			}
		}
    }
	
	var ele = document.getElementById("search-il-byCollection");
	for(i = 0; i < ele.options.length; i++){
		if(ele.options[i].text == unescape(paraObj["category"])){
			DWRUtil.setValue("search-il-byCollection",ele.options[i].value);
		}
	} 

    if(isIE6OR7()){
    }else{
      $("#search-il-byCollection").resetSS();
    }
	
	pager.pageNumber = paraObj["pageNumber"];
	pager.paramMap.categoryId = $("#search-il-byCollection").val();
	pager.paramMap.subCategoryId = "";
	pager.paramMap.tagName = "";
	loadPage();


    /*if(keyValue.length == 2){
       if(keyValue[0] == "category"){
	     _byCategory(unescape(keyValue[1]));
	 }
    }*/ 

   
}
function initPageFields(){
    $("#search-il-byCollection").change(function(){
        //categoryChange();
		paraObj["category"] = $("#search-il-byCollection option:selected").text();
		paraObj["pageNumber"] = "1";
		resetHashLocation();
        pager.pageNumber = 1;
        pager.paramMap.categoryId = $("#search-il-byCollection").val();
        pager.paramMap.subCategoryId = "";
        pager.paramMap.tagName = "";
        loadPage();
    });
   
/*   $("#search-il-bySet").change(function(){
        pager.pageNumber = 1;
        pager.paramMap.subCategoryId = $("#search-il-bySet").val();
        pager.paramMap.tagName = "";
        loadPage();
    }); */
	
/*    $('p[class="field inline radio"] > label').click(function(){
        var tag = $(this).text();
        //loadCategory();
        setPagerTagName(tag);
        loadPage();
    });*/
}

function categoryChange(){
   /*var cid = $("#search-il-byCollection").val();
   if(cid == ""){
        $("#search-il-bySet").empty();
        $("#search-il-bySet").append("<option value=''>Please select a collection</option>");
        $("#search-il-bySet").append("<option value=''>All images</option>");
        $("#search-il-bySet").resetSS();
   }else{
       d_ImageService.getSubCategoryList(cid, {callback:subCategoryCallBack});
   }*/
}

function subCategoryCallBack(subCategoryList){
    $("#search-il-bySet").empty();
    $("#search-il-bySet").append("<option value=''>Please select a collection</option>");
    $("#search-il-bySet").append("<option value=''>All images</option>");
    for(var i = 0; i < subCategoryList.length; i++){
         $("#search-il-bySet").append("<option value='"+subCategoryList[i].id +"'>" + subCategoryList[i].name + "</option>");
    }
    $("#search-il-bySet").resetSS();
}

function setPagerTagName(tag){
    pager.paramMap.tagName = tag;
    pager.paramMap.categoryId = "";
    pager.paramMap.subCategoryId = "";
    pager.pageNumber = 1;
}

function loadPage(){
    pager.list = [];
    d_ImageService.getImageList(pager, {callback:pageLoadCallback});
}

function pageLoadCallback(tempPage){
       pager = tempPage;
       generatePageBar();
       generateContent();
}

function generateContent(){
    var imageList = pager.list;
    $("#paginationtop").empty();
    $("#image-library").empty();
    $("#paginationbottom").empty();

    if(imageList.length == 0){
        $("#paginationtop").append("<p>No image returned.</span></p>");
    }else{
        var imagevo = null;
        generatePageBar();
        $("#image-library").append("<ul class='grid'>");
        for(var i = 0; i < imageList.length; i++){
            imagevo = imageList[i];
            if(i % 3 == 0){
                $(".grid").append("<li class='clear'>" + "<a href = '"+imagevo.dcrPath.replace(/.xml/, ".html")+"'><img src='" + imagevo.image1Url + "' width='168' height='95' alt='" + imagevo.title + "' title='" + imagevo.title + "'></a>" +
                                                    "<h3>" + imagevo.title + "</h3>" +
                                                    "<h4>Found in</h4>" +
                                                    "<p><a href='#' onclick='_byCategory(\"" + imagevo.tag + "\");return false;'>" + imagevo.tag + "</a></p>" +
                                                    "<h4>Download</h4>" +
                                                    "<p class='halfmargin'><a href='" + imagevo.smallImageDownload + "' class='download'><span>Download image</span></a></p>" +
                                                    "</li>");
            }else if(i % 3 == 1){
                $(".grid").append("<li>" + "<a href = '"+imagevo.dcrPath.replace(/.xml/, ".html")+"'><img src='" + imagevo.image1Url + "' width='168' height='95' alt='" + imagevo.title + "' title='" + imagevo.title + "'></a>" +
                                                    "<h3>" + imagevo.title + "</h3>" +
                                                    "<h4>Found in</h4>" +
                                                    "<p><a href='#' onclick='_byCategory(\"" + imagevo.tag + "\");return false;'>" + imagevo.tag + "</a></p>" +
                                                    "<h4>Download</h4>" +
                                                    "<p class='halfmargin'><a href='" + imagevo.smallImageDownload + "' class='download'><span>Download image</span></a></p>" +
                                                    "</li>");
            }else{
                $(".grid").append("<li class='last'>" + "<a href = '"+imagevo.dcrPath.replace(/.xml/, ".html")+"'><img src='" + imagevo.image1Url + "' width='168' height='95' alt='" + imagevo.title + "' title='" + imagevo.title + "'>" + 
                                                    "<h3></a>" + imagevo.title + "</h3>" +
                                                    "<h4>Found in</h4>" +
                                                    "<p><a href='#' onclick='_byCategory(\"" + imagevo.tag + "\");return false;'>" + imagevo.tag + "</a></p>" +
                                                    "<h4>Download</h4>" +
                                                    "<p class='halfmargin'><a href='" + imagevo.smallImageDownload + "' class='download'><span>Download image</span></a></p>" +
                                                    "</li>");
            }
        }
        $("#image-library").append("</ul>");
    }
}

function _byCategory(categoryName){

    var ele = document.getElementById("search-il-byCollection");
    for (i = 0; i < ele.options.length; i++) {
      if (ele.options[i].text.toLowerCase() == unescape(categoryName.toLowerCase())) {
        DWRUtil.setValue("search-il-byCollection", ele.options[i].value);
      }
    }
         
    if(isIE6OR7()){
    }else{
      $("#search-il-byCollection").resetSS();
    }
	
	if(categoryName != paraObj["category"]){  //click the region link in one item in the listing page
		paraObj["category"] = categoryName;
		resetHashLocation();
		pager.pageNumber = 1; 
	}else{
		pager.pageNumber = paraObj["pageNumber"];
	} 
	 
 
     pager.pageNumber = paraObj["pageNumber"];
     pager.paramMap.categoryId = $("#search-il-byCollection").val();
     pager.paramMap.subCategoryId = "";
     pager.paramMap.tagName = "";
     loadPage();

}


function generatePageBar(){
    var navigatePageNumbers =   pager.navigatePageNumbers;
    var navigatePageNumbersLi = "";
    for (var i = 0; i < navigatePageNumbers.length; i++) {
        if (navigatePageNumbers[i] == pager.pageNumber) {
            navigatePageNumbersLi = navigatePageNumbersLi + "<li class='selected'><a href='#' onclick='gotoNextPage("+navigatePageNumbers[i]+");return false;'>" + navigatePageNumbers[i] + "</a></li> "
        }  else if (i == navigatePageNumbers.length - 1) {
            navigatePageNumbersLi = navigatePageNumbersLi + "<li class='last'><a href='#' onclick='gotoNextPage("+navigatePageNumbers[i]+");return false;'>" + navigatePageNumbers[i] + "</a></li> "
        }   else{
             navigatePageNumbersLi = navigatePageNumbersLi + "<li><a href='#' onclick='gotoNextPage( "+navigatePageNumbers[i]+");return false;'>" + navigatePageNumbers[i] + "</a></li> "
        }
    }
     appendPageBar($("#paginationtop"),navigatePageNumbersLi) ;
     appendPageBar($("#paginationbottom"),navigatePageNumbersLi) ;
}

function gotoNextPage(page){
   if(page>pager.pages || page<1){
        return;
   }
   paraObj["pageNumber"]=page;
   resetHashLocation();
   pager.pageNumber = page;
   loadPage();
}

function appendPageBar(elmentToAppend,navigatePageNumbersLi){
     elmentToAppend.empty();
     elmentToAppend.append(
    "<ul class='pagination-nav'>" +
    "<li class='prev-page'><a href='#' onclick='gotoNextPage("+(pager.pageNumber-1) +");return false;'>&lt;</a></li> " +
    "<li class='index'>" +
    "<ul>"+navigatePageNumbersLi +

    "</ul>" +
    "</li>" +
    "<li class='next-page'><a href='#' onclick='gotoNextPage("+(pager.pageNumber+1) +");return false;'>&gt;</a></li>" +
    "<li class='first-page'><a href='#' onclick='gotoNextPage("+1 +");return false;'>|&lt;</a></li>" +
    "<li class='last-page'><a href='#' onclick='gotoNextPage("+pager.pages +");return false;'>&gt;|</a></li>" +
    "</ul>"+
    "<p class='pagination-range'>Displaying <span id='range-min'>"+
        ((pager.pageNumber-1)*pager.limit +1) +
        "</span> to  <span id='range-max'>"+
         (pager.total<pager.pageNumber*pager.limit? pager.total:pager.pageNumber*pager.limit) +
        "</span> of " +
       "<span id='total-set'>"+
          pager.total +
        "</span> matches "+
        "</p>");
}