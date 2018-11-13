

function addEl() {
    let links = document.querySelectorAll('#nav-tray-portal a[href*="/accounts"]');
    let values = document.querySelectorAll('#nav-tray-portal a[href*="/accounts"] span');
    let accountNumbers = Array.from(links).map(link => {
        return link.href.split('/')[4];

    });
    let subaccounts = { "100": "Online", "102": "Pathway", "104": "Non-Academic", "106": "Pathway", "108": "Pathway", "110": "Pathway", "112": "Development", "114": "Development", "118": "Pathway", "13": "Development", "17": "Development", "18": "Development", "19": "Development", "24": "Pathway", "25": "Non-Academic", "26": "Manually-Created Courses", "27": "Development", "35": "Campus", "39": "Pathway", "41": "Development", "42": "Online", "43": "Online", "44": "Online", "45": "Online", "46": "Online", "47": "Pathway", "48": "BYUI", "49": "BYUI", "5": "Online", "50": "BYUI", "51": "BYUI", "52": "BYUI", "53": "BYUI", "54": "BYUI", "55": "BYUI", "56": "BYUI", "57": "BYUI", "58": "BYUI", "59": "BYUI", "60": "BYUI", "61": "BYUI", "62": "BYUI", "63": "BYUI", "64": "BYUI", "65": "BYUI", "66": "BYUI", "67": "BYUI", "68": "BYUI", "69": "BYUI", "7": "Campus", "70": "BYUI", "71": "BYUI", "72": "BYUI", "73": "BYUI", "74": "BYUI", "75": "BYUI", "76": "BYUI", "77": "BYUI", "78": "BYUI", "79": "BYUI", "8": "Sandbox", "80": "BYUI", "81": "BYUI", "82": "BYUI", "83": "BYUI", "84": "BYUI", "85": "BYUI", "86": "BYUI", "96": "Non-Academic", "98": "Non-Academic" };

    accountNumbers.forEach((accountNumber, i) => {
        let value = values[i].innerHTML;
        let keyIndex = Object.keys(subaccounts).find((key) => {

            return key === accountNumber;
        });
        if (subaccounts[keyIndex] === value || subaccounts[keyIndex] === undefined) {
            console.log('returned');
            return;
        } else {
            values[i].innerHTML = `${subaccounts[keyIndex]} ${values[i].innerHTML}`;
        }
        console.log('This is doing a thing');
    });
}

function waitFor(parent, fn, cb) {
    var observer = new MutationObserver(() => {
        if (fn()) {
            observer.disconnect();
            cb();
            observer.observe(parent, {
                attributes: true,
                childList: true,
                subtree: true,
            });
        }
    });
    observer.observe(parent, {
        attributes: true,
        childList: true,
        subtree: true,
    });
}

/* If the option to show the cross-listed column is on, then do it */
chrome.storage.sync.get({
    adminAccountNames: false,
}, function (items) {
    if (items.adminAccountNames === true) {
        waitFor(document.querySelector('#nav-tray-portal'), () => document.querySelectorAll('#nav-tray-portal a').length > 0, addEl);
    }
});


/**
 * Use account ID to find the number to find the subaccount
 */

// Wait fo this to appear before loading the rest of the extension? 
{/* <span class="_3PtINRL _1kcGt6A _2fHAswJ _3Q93Z1L _2_zsa_m" data-reactid=".6"><span role="dialog" aria-label="Global navigation tray" data-reactid=".6.0"><div data-reactid=".6.0.0"><span class="_1ASW8yi _2ISbIMb _3lizj3V" data-reactid=".6.0.0.0"><button type="button" role="button" tabindex="0" class="_3Zltvf_ _3C6pvc5 _3uisJCE _3QASkHv _13mEBGY _3UROOwf _31TNahl" style="margin:0px;cursor:pointer;" data-reactid=".6.0.0.0.0"><span class="QJpaM9j" data-reactid=".6.0.0.0.0.0"><span class="_1O6_bJL" data-reactid=".6.0.0.0.0.0.0"><svg name="IconX" viewBox="0 0 1920 1920" width="1em" height="1em" aria-hidden="true" role="presentation" class="rDcS_u2 _20Owl4M _17OBplh" data-reactid=".6.0.0.0.0.0.0.0" disabled="true"><g role="presentation" data-reactid=".6.0.0.0.0.0.0.0.2"><path d="M771.548 960.11L319 1412.658l188.562 188.562 452.548-452.548 452.548 452.548 188.562-188.562-452.548-452.548 452.548-452.548L1412.658 319 960.11 771.548 507.562 319 319 507.562z" stroke="none" stroke-width="1" data-reactid=".6.0.0.0.0.0.0.0.2.0"></path></g></svg></span><span class="_3fbL2UF" data-reactid=".6.0.0.0.0.0.1">Close</span></span></button></span><div class="tray-with-space-for-global-nav" data-reactid=".6.0.0.1"><div class="_3Zltvf_" style="padding:1.5rem;" data-reactid=".6.0.0.1.0"><h2 class="_3Zltvf_ _3Y4y6OP rJPcniw _58ZWQOM" data-reactid=".6.0.0.1.0.0">Admin</h2><hr role="presentation" data-reactid=".6.0.0.1.0.1"><ul class="_3Zltvf_ _1ORH5_a _3rPcmwf _3ciUERv" style="margin:0.75rem 0;" data-reactid=".6.0.0.1.0.2"><li class="_3Zltvf_ _3uBOhFT _1SwmwfM JqKJg-w _39fXi0e" data-reactid=".6.0.0.1.0.2.$45/=1$45"><span class="_3Zltvf_ _2VYW9yg" data-reactid=".6.0.0.1.0.2.$45/=1$45.0"><a class="_3IooTL8" href="/accounts/45" data-reactid=".6.0.0.1.0.2.$45/=1$45.0.0"><span data-reactid=".6.0.0.1.0.2.$45/=1$45.0.0.1">Archived</span></a></span></li><li class="_3Zltvf_ _3uBOhFT _1SwmwfM JqKJg-w _39fXi0e" data-reactid=".6.0.0.1.0.2.$108/=1$108"><span class="_3Zltvf_ _2VYW9yg" data-reactid=".6.0.0.1.0.2.$108/=1$108.0"><a class="_3IooTL8" href="/accounts/108" data-reactid=".6.0.0.1.0.2.$108/=1$108.0.0"><span data-reactid=".6.0.0.1.0.2.$108/=1$108.0.0.1">Archived</span></a></span></li><li class="_3Zltvf_ _3uBOhFT _1SwmwfM JqKJg-w _39fXi0e" data-reactid=".6.0.0.1.0.2.$44/=1$44"><span class="_3Zltvf_ _2VYW9yg" data-reactid=".6.0.0.1.0.2.$44/=1$44.0"><a class="_3IooTL8" href="/accounts/44" data-reactid=".6.0.0.1.0.2.$44/=1$44.0.0"><span data-reactid=".6.0.0.1.0.2.$44/=1$44.0.0.1">Scaled</span></a></span></li><li class="_3Zltvf_ _3uBOhFT _1SwmwfM JqKJg-w _39fXi0e" data-reactid=".6.0.0.1.0.2.$110/=1$110"><span class="_3Zltvf_ _2VYW9yg" data-reactid=".6.0.0.1.0.2.$110/=1$110.0"><a class="_3IooTL8" href="/accounts/110" data-reactid=".6.0.0.1.0.2.$110/=1$110.0.0"><span data-reactid=".6.0.0.1.0.2.$110/=1$110.0.0.1">Scaled</span></a></span></li><li class="_3Zltvf_ _3uBOhFT _1SwmwfM JqKJg-w _39fXi0e" data-reactid=".6.0.0.1.0.2.$hr/=1$hr"><hr role="presentation" data-reactid=".6.0.0.1.0.2.$hr/=1$hr.0"></li><li class="_3Zltvf_ _3uBOhFT _1SwmwfM JqKJg-w _39fXi0e" data-reactid=".6.0.0.1.0.2.$all/=1$all"><span class="_3Zltvf_ _2VYW9yg" data-reactid=".6.0.0.1.0.2.$all/=1$all.0"><a class="_3IooTL8" href="/accounts" data-reactid=".6.0.0.1.0.2.$all/=1$all.0.0"><span data-reactid=".6.0.0.1.0.2.$all/=1$all.0.0.1">All Accounts</span></a></span></li></ul></div></div></div></span></span> */ }

// < div class="_3Zltvf_" style = "padding:1.5rem;" data - reactid=".4.0.0.1.0" > <h2 class="_3Zltvf_ _3Y4y6OP rJPcniw _58ZWQOM" data-reactid=".4.0.0.1.0.0">Admin</h2> <hr role="presentation" data-reactid=".4.0.0.1.0.1"><ul class="_3Zltvf_ _1ORH5_a _3rPcmwf _3ciUERv" style="margin:0.75rem 0;" data-reactid=".4.0.0.1.0.2"><li class="_3Zltvf_ _3uBOhFT _1SwmwfM JqKJg-w _39fXi0e" data-reactid=".4.0.0.1.0.2.$45/=1$45"><span class="_3Zltvf_ _2VYW9yg" data-reactid=".4.0.0.1.0.2.$45/=1$45.0"><a class="_3IooTL8" href="/accounts/45" data-reactid=".4.0.0.1.0.2.$45/=1$45.0.0"><span data-reactid=".4.0.0.1.0.2.$45/=1$45.0.0.1">Archived</span></a></span></li><li class="_3Zltvf_ _3uBOhFT _1SwmwfM JqKJg-w _39fXi0e" data-reactid=".4.0.0.1.0.2.$108/=1$108"><span class="_3Zltvf_ _2VYW9yg" data-reactid=".4.0.0.1.0.2.$108/=1$108.0"><a class="_3IooTL8" href="/accounts/108" data-reactid=".4.0.0.1.0.2.$108/=1$108.0.0"><span data-reactid=".4.0.0.1.0.2.$108/=1$108.0.0.1">Archived</span></a></span></li><li class="_3Zltvf_ _3uBOhFT _1SwmwfM JqKJg-w _39fXi0e" data-reactid=".4.0.0.1.0.2.$44/=1$44"><span class="_3Zltvf_ _2VYW9yg" data-reactid=".4.0.0.1.0.2.$44/=1$44.0"><a class="_3IooTL8" href="/accounts/44" data-reactid=".4.0.0.1.0.2.$44/=1$44.0.0"><span data-reactid=".4.0.0.1.0.2.$44/=1$44.0.0.1">Scaled</span></a></span></li><li class="_3Zltvf_ _3uBOhFT _1SwmwfM JqKJg-w _39fXi0e" data-reactid=".4.0.0.1.0.2.$110/=1$110"><span class="_3Zltvf_ _2VYW9yg" data-reactid=".4.0.0.1.0.2.$110/=1$110.0"><a class="_3IooTL8" href="/accounts/110" data-reactid=".4.0.0.1.0.2.$110/=1$110.0.0"><span data-reactid=".4.0.0.1.0.2.$110/=1$110.0.0.1">Scaled</span></a></span></li><li class="_3Zltvf_ _3uBOhFT _1SwmwfM JqKJg-w _39fXi0e" data-reactid=".4.0.0.1.0.2.$hr/=1$hr"><hr role="presentation" data-reactid=".4.0.0.1.0.2.$hr/=1$hr.0"></li><li class="_3Zltvf_ _3uBOhFT _1SwmwfM JqKJg-w _39fXi0e" data-reactid=".4.0.0.1.0.2.$all/=1$all"><span class="_3Zltvf_ _2VYW9yg" data-reactid=".4.0.0.1.0.2.$all/=1$all.0"><a class="_3IooTL8" href="/accounts" data-reactid=".4.0.0.1.0.2.$all/=1$all.0.0"><span data-reactid=".4.0.0.1.0.2.$all/=1$all.0.0.1">All Accounts</span></a></span></li></ul></div>
//     <ul class="_3Zltvf_ _1ORH5_a _3rPcmwf _3ciUERv" style="margin:0.75rem 0;" data-reactid=".4.0.0.1.0.2"><li class="_3Zltvf_ _3uBOhFT _1SwmwfM JqKJg-w _39fXi0e" data-reactid=".4.0.0.1.0.2.$45/=1$45"><span class="_3Zltvf_ _2VYW9yg" data-reactid=".4.0.0.1.0.2.$45/=1$45.0"><a class="_3IooTL8" href="/accounts/45" data-reactid=".4.0.0.1.0.2.$45/=1$45.0.0"><span data-reactid=".4.0.0.1.0.2.$45/=1$45.0.0.1">Archived</span></a></span></li><li class="_3Zltvf_ _3uBOhFT _1SwmwfM JqKJg-w _39fXi0e" data-reactid=".4.0.0.1.0.2.$108/=1$108"><span class="_3Zltvf_ _2VYW9yg" data-reactid=".4.0.0.1.0.2.$108/=1$108.0"><a class="_3IooTL8" href="/accounts/108" data-reactid=".4.0.0.1.0.2.$108/=1$108.0.0"><span data-reactid=".4.0.0.1.0.2.$108/=1$108.0.0.1">Archived</span></a></span></li><li class="_3Zltvf_ _3uBOhFT _1SwmwfM JqKJg-w _39fXi0e" data-reactid=".4.0.0.1.0.2.$44/=1$44"><span class="_3Zltvf_ _2VYW9yg" data-reactid=".4.0.0.1.0.2.$44/=1$44.0"><a class="_3IooTL8" href="/accounts/44" data-reactid=".4.0.0.1.0.2.$44/=1$44.0.0"><span data-reactid=".4.0.0.1.0.2.$44/=1$44.0.0.1">Scaled</span></a></span></li><li class="_3Zltvf_ _3uBOhFT _1SwmwfM JqKJg-w _39fXi0e" data-reactid=".4.0.0.1.0.2.$110/=1$110"><span class="_3Zltvf_ _2VYW9yg" data-reactid=".4.0.0.1.0.2.$110/=1$110.0"><a class="_3IooTL8" href="/accounts/110" data-reactid=".4.0.0.1.0.2.$110/=1$110.0.0"><span data-reactid=".4.0.0.1.0.2.$110/=1$110.0.0.1">Scaled</span></a></span></li><li class="_3Zltvf_ _3uBOhFT _1SwmwfM JqKJg-w _39fXi0e" data-reactid=".4.0.0.1.0.2.$hr/=1$hr"><hr role="presentation" data-reactid=".4.0.0.1.0.2.$hr/=1$hr.0"></li><li class="_3Zltvf_ _3uBOhFT _1SwmwfM JqKJg-w _39fXi0e" data-reactid=".4.0.0.1.0.2.$all/=1$all"><span class="_3Zltvf_ _2VYW9yg" data-reactid=".4.0.0.1.0.2.$all/=1$all.0"><a class="_3IooTL8" href="/accounts" data-reactid=".4.0.0.1.0.2.$all/=1$all.0.0"><span data-reactid=".4.0.0.1.0.2.$all/=1$all.0.0.1">All Accounts</span></a></span></li></ul>
//         <a class="_3IooTL8" href="/accounts/108" data-reactid=".4.0.0.1.0.2.$108/=1$108.0.0"><span data-reactid=".4.0.0.1.0.2.$108/=1$108.0.0.1">Archived</span></a>

//         <a class="_3IooTL8" href="/accounts/45" data-reactid=".4.0.0.1.0.2.$45/=1$45.0.0"><span data-reactid=".4.0.0.1.0.2.$45/=1$45.0.0.1">Archived</span></a>

//         <a class="_3IooTL8" href="/accounts/44" data-reactid=".4.0.0.1.0.2.$44/=1$44.0.0"><span data-reactid=".4.0.0.1.0.2.$44/=1$44.0.0.1">Scaled</span></a>

//         <a class="_3IooTL8" href="/accounts/110" data-reactid=".4.0.0.1.0.2.$110/=1$110.0.0"><span data-reactid=".4.0.0.1.0.2.$110/=1$110.0.0.1">Scaled</span></a>


// let subaccounts = { "100": "Online", "102": "Pathway", "104": "Non-Academic", "106": "Pathway", "108": "Pathway", "110": "Pathway", "112": "Development", "114": "Development", "118": "Pathway", "13": "Development", "17": "Development", "18": "Development", "19": "Development", "24": "Pathway", "25": "Non-Academic", "26": "Manually-Created Courses", "27": "Development", "35": "Campus", "39": "Pathway", "41": "Development", "42": "Online", "43": "Online", "44": "Online", "45": "Online", "46": "Online", "47": "Pathway", "48": "BYUI", "49": "BYUI", "5": "Online", "50": "BYUI", "51": "BYUI", "52": "BYUI", "53": "BYUI", "54": "BYUI", "55": "BYUI", "56": "BYUI", "57": "BYUI", "58": "BYUI", "59": "BYUI", "60": "BYUI", "61": "BYUI", "62": "BYUI", "63": "BYUI", "64": "BYUI", "65": "BYUI", "66": "BYUI", "67": "BYUI", "68": "BYUI", "69": "BYUI", "7": "Campus", "70": "BYUI", "71": "BYUI", "72": "BYUI", "73": "BYUI", "74": "BYUI", "75": "BYUI", "76": "BYUI", "77": "BYUI", "78": "BYUI", "79": "BYUI", "8": "Sandbox", "80": "BYUI", "81": "BYUI", "82": "BYUI", "83": "BYUI", "84": "BYUI", "85": "BYUI", "86": "BYUI", "96": "Non-Academic", "98": "Non-Academic" };

// let stringified = JSON.stringify(subaccounts);

// console.log(Array.from(Object.keys(subaccounts)));