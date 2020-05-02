var reg = /([+]93|[+]358|[+]355|[+]213|[+]1684|[+]376|[+]244|[+]1264|[+]672|[+]1268|[+]54|[+]374|[+]297|[+]61|[+]43|[+]994|[+]1242|[+]973|[+]880|[+]1246|[+]375|[+]32|[+]501|[+]229|[+]1441|[+]975|[+]591|[+]387|[+]267|[+]47|[+]55|[+]246|[+]673|[+]359|[+]226|[+]257|[+]855|[+]237|[+]1|[+]238|[+]345|[+]236|[+]235|[+]56|[+]86|[+]61|[+]61|[+]57|[+]269|[+]242|[+]243|[+]682|[+]506|[+]225|[+]385|[+]53|[+]357|[+]420|[+]45|[+]253|[+]1767|[+]1849|[+]593|[+]20|[+]503|[+]240|[+]291|[+]372|[+]251|[+]500|[+]298|[+]679|[+]358|[+]33|[+]594|[+]689|[+]262|[+]241|[+]220|[+]995|[+]49|[+]233|[+]350|[+]30|[+]299|[+]1473|[+]590|[+]1671|[+]502|[+]44|[+]224|[+]245|[+]592|[+]509|[+]672|[+]379|[+]504|[+]852|[+]36|[+]354|[+]91|[+]62|[+]98|[+]964|[+]353|[+]44|[+]972|[+]39|[+]1876|[+]81|[+]44|[+]962|[+]7|[+]254|[+]686|[+]850|[+]82|[+]383|[+]965|[+]996|[+]856|[+]371|[+]961|[+]266|[+]231|[+]218|[+]423|[+]370|[+]352|[+]853|[+]389|[+]261|[+]265|[+]60|[+]960|[+]223|[+]356|[+]692|[+]596|[+]222|[+]230|[+]262|[+]52|[+]691|[+]373|[+]377|[+]976|[+]382|[+]1664|[+]212|[+]258|[+]95|[+]264|[+]674|[+]977|[+]31|[+]599|[+]687|[+]64|[+]505|[+]227|[+]234|[+]683|[+]672|[+]1670|[+]47|[+]968|[+]92|[+]680|[+]970|[+]507|[+]675|[+]595|[+]51|[+]63|[+]64|[+]48|[+]351|[+]1939|[+]974|[+]40|[+]7|[+]250|[+]262|[+]590|[+]290|[+]1869|[+]1758|[+]590|[+]508|[+]1784|[+]685|[+]378|[+]239|[+]966|[+]221|[+]381|[+]248|[+]232|[+]65|[+]421|[+]386|[+]677|[+]252|[+]27|[+]211|[+]500|[+]34|[+]94|[+]249|[+]597|[+]47|[+]268|[+]46|[+]41|[+]963|[+]886|[+]992|[+]255|[+]66|[+]670|[+]228|[+]690|[+]676|[+]1868|[+]216|[+]90|[+]993|[+]1649|[+]688|[+]256|[+]380|[+]971|[+]44|[+]1|[+]598|[+]998|[+]678|[+]58|[+]84|[+]1284|[+]1340|[+]681|[+]967|[+]260|[+]263)?[\s]?([1-9]{3}[\s-]?)([0-9]{3}[\s-]?)(\d{4})\D/g;
var reg2 = /([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/g;
var validDomain =	[".com",".net",".cc",".in",".org",".me",
									".gov",".co",".tech",".edu",".int"
									];
function isValidDomain(email){
	var em = email.toLowerCase();
	var flag = false;
	for(var i = 0 ; i < validDomain.length ; i++){
		if(em.endsWith(validDomain[i])){
			flag = true;
			break;
		}
	}

	return flag;
}
function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    var phone_numbers = html.match(reg);
    var emails = html.match(reg2);
    if(!phone_numbers){
    	phone_numbers = [];
    }
    if(!emails){
    	emails = [];
    }
    var exist_numbers = [];
    var phone_numbers_optimal = [];
    var emails_optimal = [];
    try{
	    for(var i = 0 ; i < phone_numbers.length ; i++){
	    	var phone = phone_numbers[i];
	    	if(/\D/.test(phone_numbers[phone_numbers.length-1])){
	    			phone = phone.slice(0, -1);
	    	}
	    	phone = phone.replace(/\s/g,"").replace(/[-]/g,"");

	    	var c_code = phone.slice(0, phone.length-10);
	    	c_code = c_code.length==0 ? null : c_code;
	    	if(exist_numbers.indexOf(phone)==-1){
	    		phone_numbers_optimal.push([phone,c_code]);
	    		exist_numbers.push(phone);
	    	}
	    }
	}catch(err){
		console.log("No phone number found");
	}
    try{
	    for(var i = 0 ; i < emails.length ; i++){
	    	var em = emails[i].toLowerCase();
	    	if(emails_optimal.indexOf(emails[i])==-1){
	    		if(isValidDomain(em)){
	    			emails_optimal.push(em);
	    		}
	    	}
	    }
	}catch(err){
		console.log("No email found");
	}
    return [phone_numbers_optimal,emails_optimal];
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});