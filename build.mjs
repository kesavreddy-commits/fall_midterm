import {readFile,writeFile,mkdir,readdir,copyFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join,dirname} from 'node:path';
const root=dirname(fileURLToPath(import.meta.url));
const source=join(root,'source','site');
const read=name=>readFile(join(source,name),'utf8');
const learning=await Promise.all(['progress.js','cram.js','vocabulary.js','ai.js'].map(read));
const app=(await read('app.js')).replace('/*EXAM_FEATURE*/',await read('exam.js')).replace('/*LEARNING_FEATURES*/',learning.join('\n')+'\n'+await readFile(join(root,'hosted.js'),'utf8'));
const exactSource=(await read('exact-source.js')).replace('__EXACT_SOURCE_GZIP_BASE64__',(await readFile(join(source,'exact-source.txt.gz'))).toString('base64'));
let html=(await read('shell.html')).replace('/*STYLE*/',await read('style.css')).replace('/*CONTENT*/',(await read('content.js'))+'\n'+await read('exam-content.js')+'\n'+exactSource).replace('/*APP*/',app);
html=html.replace('An offline study studio for the Fall 2026 English midterm','A private study studio for the Fall 2026 English midterm').replace('Review meaning and grammar yourself; this is practice, not an automatic grade.','Use the local review controls, or import saved feedback from the local AI version.');
for(const [before,after] of [
 ['Use local self-review below, or connect ChatGPT for optional meaning and grammar feedback.','Use local self-review below, or import saved AI feedback from your local Margin app.'],
 ['Submit and grade all writing with ChatGPT, or compare with sample responses and use the local rubrics.','Compare with sample responses and use the rubrics here. ChatGPT-plan grading runs in the local Margin app.'],
 ['120 automatic points + 40 writing points with local or optional AI review.','120 automatic points + 40 writing points with local rubrics or imported AI feedback.'],
 ['writing can be reviewed locally or graded with ChatGPT.','writing uses local rubrics here, with saved AI feedback available through backup import.'],
 ['local self-review or optional ChatGPT grading','local self-review or imported ChatGPT feedback'],
 ['No account or network connection is needed.','This private website uses ChatGPT sign-in. Review tools and browser saves run locally once loaded.']
]) html=html.replaceAll(before,after);
await mkdir(join(root,'dist'),{recursive:true});
await writeFile(join(root,'dist','index.html'),html);
console.log('Built hosted Margin: '+html.length+' characters. No Mac runtime or credentials included.');
