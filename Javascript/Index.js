$(document).ready(function () {
    let flag = 0;
    $("#clear").click(function () {
        location.reload();
    });
    if(flag != 1){

        $("#kmp").click(function () {
            var search = $("#search").val();
            var comment = $("#comment").val();
            if (search != "") {
                if (comment != "") {
    
                    let text = comment;  // text
                    let t = text.toLowerCase();
                    let pattern = search;  // pattern
                    let p = pattern.toLowerCase();
                    
                    var t0 = performance.now();
                    kmpMatcher(t, p);
                    var t1 = performance.now();
    
                    // Knuth Morris Pratt Algorithm
    
                    function kmpMatcher(t, p) {
    
                        let n = t.length;
                        let m = p.length;
    
                        let pie = cPF(p);
                        for (let i = 0; i < p.length; i++) {
                            pie[i];
                        }
                        let q = 0;
    
                        for (let i = 1; i <= n; i++) {
                            while (q > 0 && p.charAt(q) != t.charAt(i - 1)) {
                                q = pie[q - 1];
                            }
                            if (p.charAt(q) == t.charAt(i - 1)) {
                                q++;
                            }
                            if (q == m) {
                                console.log("Pattern Found at: " + (i - m));
                                highlightColor(i - m);
                                q = pie[q - 1];
                            }
                        }
    
                    }
    
                    // compute Prefix Function
    
                    function cPF(p) {
    
                        let m = p.length;
    
                        let piearr = [];
                        piearr[0] = 0;
                        let k = 0;
                        for (let q = 2; q <= m; q++) {
                            while (k > 0 && p.charAt(k) != p.charAt(q - 1)) {
                                k = piearr[k - 1];
                            }
                            if (p.charAt(k) == p.charAt(q - 1)) {
                                k++;
                            }
                            piearr[q - 1] = k;
                        }
                        return piearr;
                    }
    
                    // highlight color of pattern matched
    
                    function highlightColor(n) {
                        // let msg = "";
                        // let msglast = "";
                        // for(let i = 0; i < n; i++){
                        //     msg = msg + t.charAt(i);
                        // }
                        // for(let i = n + p.length; i < t.length; i++){
                        //     msglast = msglast + t.charAt(i);
                        // }
                        $('#comment').highlightWithinTextarea({
                            highlight: search
                        });
                        $("#display2").append(`<br /><div>Pattern Found at index: ${n}</div>`);
                    }
    
                    flag = 1;
                    $("#display").append(`<div>${t1 - t0} milliseconds</div>`);
                    $("textarea").remove();
    
                }
                else {
                    alert("No Text Found");
                }
            }
            else {
                alert("Search box empty");
            }
        });

    }


});