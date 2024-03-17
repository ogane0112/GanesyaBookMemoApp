# 進捗まとめ
## 使用しているライブラリなど
- [supabase](https://supabase.com/)
- [NextUI](https://nextui.org/docs/guide/installation)
```
npm install remark remark-parse remark-react remark-gfm
```
- remark: マークダウンプロセッサ
- remark-parse: マークダウンをAbstract Syntax Tree (AST)に変換するプラグイン
- remark-react: マークダウンをReact要素に変換するプラグイン
- remark-gfm: GitHub Flavored Markdownの拡張構文をサポートするプラグイン

## 作成中のErrorまとめ
- supabaseのクライアント側のインストール忘れによるError
==>supabaseの組み込み関数がなぜかよみこまれないError
- 
## いらんやつ
```
   <button onClick={() => { setCurrentBook(book); toggleModal() }}>Save</button>
            {isOpen && (
              <div>
                <p>"{currentBook?.volumeInfo.title}" を保存しますか?</p>
                <button onClick={() => handleSave(currentBook!)}>保存</button>
                <button onClick={toggleModal}>キャンセル</button>
              </div>
            )}

```
## 実装した機能
- Google Books APIから本を検索しDBに保存する機能
- 保存した本の一覧を見る方法
- md記法でメモをする機能(DBに保存する機能は未実装です)
## 実装予定の機能
- ログイン機能
[参考](https://note.com/libproc/n/n168e87864291)
