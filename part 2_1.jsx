//FILEPATHS MAY NOT HAVE SPACES OR ELSE IT CRASHES.
var vid = prompt("Please enter the video url",'');
var scriptFolder = ((new File($.fileName)).parent);

var UFC = File([scriptFolder + '/userFolderCacher.txt']);
var done = File([scriptFolder + '/done.txt']);
done.open('r');
var doneText = done.read();

UFC.open('r');
var fullText = UFC.read();
var UF = Folder([fullText]);
UFC.close();

var importAry = []
var importFiles = UF.getFiles()
for (var i = 0; i < importFiles.length; i++) {
    importAry[i] = importFiles[i].fsName;
}

//WRITE BASH FILE WITH 'vid' AND 'UF' AND CALL THAT BASH FILE
ytBash = File([scriptFolder + '/ytdlMac'])
ytBash.open('r');
var fullTextG = ytBash.read();
ytBash.open('w')
ytBash.encoding = "UTF-8";
ytBash.lineFeed = "Unix"; //One of the values "Windows", "Macintosh", or "Unix".

var fullText = ytBash.write('\ncd ', UF );
var fullText = ytBash.write('\nyoutube-dl -f bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4  ', vid);
var fullText = ytBash.write('\necho "youtube vid downloaded" >> ', done);

ytBash.close()
ytBash.open('r');
var fullTextG = ytBash.read();
ytBash.close()
ytBash.execute();

//COMPARE THE OLD 'UF' LIST AND THE NEW 'UF' LIST 
while (done.length == 0){
    var done2 = File([scriptFolder + '/done.txt'])
    done2.open('r');
    var doneText = done2.read();
    if (done2.length > 0) {
        done2.close();
        done.close();
        break
    }
}

var importAry2 = [];
var importFiles = UF.getFiles()
while (importAry.length > importAry2.length) {
    for (var i = 0; i < importFiles.length; i++) {
        importAry2[i] = importFiles[i].fsName;
        ////alert(importAry2[i])
    }
  }

var finalVid = importAry2.filter(function(obj) { 
    return importAry.indexOf(obj) == -1; 
    
});

//IMPORT DOWNLOADED VID TO PREMIERE
app.project.importFiles(finalVid,1,app.project.rootItem,0);

done.open('w')
done.encoding = "UTF-8";
done.lineFeed = "Unix";
var fullText = done.write('');
done.close();
