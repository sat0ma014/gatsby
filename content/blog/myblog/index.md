---
title: 'My blog'
date: '2019-1-3 16:21:13'
category: 'Development'
---
Nextで編集画面を実装する。ボックスはEasyMDEを使う。

[$card](https://qiita.com/dojyorin/items/ba8847362a44bbdd3a7c)

によるとsimpleMDEの実装はこう。
´´´SimpleMDE.html
<!DOCTYPE html>
<html lang="ja">
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simplemde@latest/dist/simplemde.min.css">
        <script src="https://cdn.jsdelivr.net/npm/simplemde@latest/dist/simplemde.min.js"></script>
    </head>
    <body>
        <textarea id="mde"></textarea>
    </body>
    <script>
        const mde = new SimpleMDE({
            element: document.getElementById("mde")
        });
    </script>
</html>
´´´