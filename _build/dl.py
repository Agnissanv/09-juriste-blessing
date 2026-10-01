import requests,time,io,shutil
from PIL import Image
H={'User-Agent':'CodeAZ-demo/1.0 (https://agnissanisaac.com)'}
items=[("Palais de justice d'Abidjan.jpg","palais",2000),("Le Plateau depuis le Pont ADO – Abidjan.jpg","plateau",2200),("Plateau Abidjan de nuit.jpg","plateau-nuit",2000),("Themis lady of Justice statue in Amaliada Greece 05.jpg","themis",1400)]
for t,name,w in items:
    r=requests.get('https://commons.wikimedia.org/w/api.php',headers=H,params={'action':'query','titles':'File:'+t,'prop':'imageinfo','iiprop':'url','iiurlwidth':w,'format':'json'}).json()
    p=list(r['query']['pages'].values())[0]; u=p['imageinfo'][0]['thumburl']
    time.sleep(3); d=requests.get(u,headers=H,timeout=90); print(name,d.status_code,len(d.content))
    if d.status_code==200:
        im=Image.open(io.BytesIO(d.content)).convert('RGB'); im.save(f'img/{name}.webp',quality=78,method=6); print(im.size)
    time.sleep(3)
src='C:/Projets Personnels Dev Web/GitHub/Cabinet_avocats/img/'
for n in ['livres','colonnes','sceau']: shutil.copy(src+n+'.webp','img/'+n+'.webp')
