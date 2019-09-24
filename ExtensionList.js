/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
require.config( {
	baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
} );

require( ["js/qlik"], function ( qlik ) {
	qlik.setOnError( function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		$( '#popup' ).fadeIn( 1000 );
	} );
	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );

	//callbacks -- inserted here --
	//open apps -- inserted here --
	var app = qlik.openApp('HR Qlik Tech/HR Qlik Tech New.qvf', config);

app.getList("sheet", function(reply){
	var str = '';
	$.each(reply.qAppObjectList.qItems, function(key, value) {
		$.each(value.qData.cells, function(key1, value1) {
			str += '<tr>';
			str +=  '<td>' + value.qInfo.qId + '</td>' + '<td>' + value.qMeta.title + '</td>' ;
			str +=  '<td>' + value1.name + '</td>' + '<td>' + value1.type + '</td>' ;
			str += '</tr>';
			console.log(value1);
		});
	});
	$('#ExtList').html(str);
});

	//get objects -- inserted here --
	
	//create cubes and lists -- inserted here --

} );
