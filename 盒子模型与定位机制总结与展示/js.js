function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
}

window.onload = function() {
    var myA = document.getElementsByTagName('a');
    var iframe = $('content').getElementsByTagName('iframe');
    for (var i = myA.length - 1; i >= 0; i--) {
        myA[i].index = i;

        myA[i].onclick = function() {

            var mySrc = "presentation/" + this.index + ".html";
            iframe[0].src = mySrc;
        }
    };


}
