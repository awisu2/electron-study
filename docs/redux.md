# redux

- redux-toolkit: redux 使うならこれにしとけな補助ツール後述
- component 間で共有で扱えることができ、redux のデータ
- redux 難しいけど、もっとかんたんな選択肢ないの？
  - redux-toolkit という redux を使いやすくする方法が用意されている
    - このレリポジトリも redux-toolkit で構成
  - react 公式で実装されている useContext で用が足りそうならそれでも良いかもくらい
  - 使わない理由を調べるくらいなら覚えたほうがはやい。
    - あるにはあるが、どれも(redux と同じように)用途が限られるとしか言えない。

## redux の簡易基礎説明

redux の公式サイトやその他サイトでも丁寧な説明がされているが、個人的には初見意味不明だったので自分用の説明(理解を優先しているので、正確な説明ではないです)

- state: データ。例えば `count: number`, `todos: string[]` 僕らはこれを扱いたいだけなのに難しい redux を覚えないといけない
  - redux になるとこれを更新するだけなのに超難しくなる
  - 後述する reducer によって管理され、基本的に表に出てこない
  - reducer に対して型宣言をするが、型は初期値(initialstate)としてしか出てこない。
    - initialstate でどんな値を使いたいかを設定する
- reducer: state を更新する関数。最新の state を受け取って、更新後の state を返却する。
  - state の最新値は後述する store で管理される。
  - どんな更新をするか？は同時に受け取る後述の action により決定される。大抵 `switch(action.type)` で判定
  - 英訳した中で一致しそうな意訳は 「(整理して)変える」
    - js の配列関数にもあるのでそちらを見れば概念はわかりやすいかも
    - [Array\.prototype\.reduce\(\) \- JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
  - 複数宣言することが可能。counter と todos など
  - combineReducers によって、一つの reducer にまとめることが可能
    - ex: `combineReducers({count: countReducer, todos: })`
  - 後述する dispatch(更新メソッド)により、後述する action(更新内容)が引き渡され、action.type を参照することで、特定の更新を行う
- store: reducer を保持(複数可能)し、redux に私(redux)ありますよと宣言するときにセットされる
- action: satte をどんなふうに更新するのかを指定する値。たいてい type を含んだハッシュ値
  - コレ自体は非常に小さく, 大抵 `{type: string, payload?: any}` のように構成されるが色々と説明が必要な値
  - 後述する dispatch に引数として渡すことで毎回 **store 内の全 reducer に渡される** (そのため type の値をユニークにする工夫が必要)
  - type: どんな更新をするかを指定する
    - `{reducer}/{type}`という形式で宣言するのがおすすめ(ユニークにする)
    - 例 `count/increment`, `count/decrement`, `todos/add`
  - payload: payload は action に対する値
    - 例えば count を increment するという場合、デフォルトで 1 であれば不要だが、不明の場合どれだけ増加させるかを指定する場合に利用
- createAction: action を生成する関数。
  - redux の説明でデカデカと表記されるが、実際 action の type の管理のほうが大事。
  - type と(可変である)payload をセットで生成するという理由で重要

component で redux を利用する

- Provider: store を認識させるタグ配下のコンポーネントで今回宣言した redux を利用できるようにする
  - 例： `<Provider store={store}><your components></Provide>`
- useSelector, useDispatch: redux の hook 関数。component 内で store にアクセスできる
  - useSelector: store
    - 例：`count = useSelector((state) => state.count.count)`
      - state には store の root からの state が渡される。count は combineReducers でのキー名
- useDispatch: satte を更新するための関数 dispatch を生成する関数.(`dispatch = useDispatch()`)
  - hook の特性上、function 内でインスタンスを生成する必要があるため更新する関数を作る関数が用意されるという事になっているのだともう。
  - dispatch(action)という形で利用

## redux を利用する際の問題、+typescript での課題

store を生成して、Provider で store を指定すればあとはコンポーネントでどう使えばいいか？という話になるがちょっとめんどくさい問題が残る

そしてこれらは後述する redux-toolkit により大体解決する

### useSelector で取得できる state が深いというか不定

store は複数の reducer を受け取って管理する。通常 combineReducers 関数によって統合されるがこれは、すでに統合された reducer に対しても行うことができるその結果以下のようなアクセス方法が必要となる

`state.FirstReducer.Secondreducer....todos[0].text`

このときの FirstReducer や Secondreducer は、combineReducers で設定したときのキー値に依存する不安定なハッシュ値に依存される。

もし宣言して取得しやすくしたとして、その値を component に認識させるためだけに import や宣言が多量に発生する

### redux スクリプトをどう配置するか？

redux の構成を把握したとして、構成要素が多く汎用性をもたせつつどう source を配置するかを考える必要がある

一つの回として、re-ducks パターンというものがあった

[alexnm/re\-ducks: An attempt to extend the original proposal for redux modular architecture: https://github\.com/erikras/ducks\-modular\-redux](https://github.com/alexnm/re-ducks)

### typescript での課題

とにかくどこから型を持ってきたらよいか？が課題になる

上記 re-ducks パターンは整頓されてていい感じに見えるが、中身を見てみると export と import が大量に発生しています。typescript 用の型宣言を更に実装する必要があるわけで、一旦実装を進めましたが私は途中で諦めました。

メンテナンス性が悪く。reducer 更新したら追加で大量の export を書かないといけないためです。これを作ってすぐならともかく、しばらく立って忘れた頃には非常に辛いスクリプトになっているでしょう

## redux-toolkit

redux を利用しやすくした補助ツール

分離していた state の宣言、reducer と action などを createSlice 関数で統合管理しソース配置/管理問題や、それに関する型問題などその他諸々を解決してくれます。

ここでは tutorial にそった利用方法だけ記述します(ディレクトリ構成など異なりますが)。公式サイトでは課題も含めなぜこうなったか丁寧な説明がされているので詳細はそちらを([Getting Started \| Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started))

yarn add @reduxjs/toolkit

_store/index.ts_

```ts
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

_store/hooks.ts_

useDispatch、useSelector の wrapper, typescript の型問題を解決してくれる

```ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from ".";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

_store/reducers/counter.ts_

(細かい話) ここでは RootState 型を取得するため cycle import になります。動作上問題にはなりませんが、気になる場合は selectore 要ファイルを別途用意したほうが良いかもです（せっかく統合されたファイルが分割されますが。。。）

```ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";

// Define a type for the slice state
interface CounterState {
  value: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
```

_store/index.ts_ (再)

counterReducer を追加しています

```ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counter";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

_index.tsx_

Provide で store 宣言

```tsx
import * as ReactDOM from "react-dom";
import Top from "./Top";
import { Provider } from "react-redux";
import { store } from "./store";

export default function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Top />
    </Provider>,
    document.getElementById("app")
  );
}
```

_Top.tsx_

```tsx
import { useAppSelector, useAppDispatch } from "./store/hooks";
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from "./store/reducers/counter";
import { useState } from "react";

export default function Top() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const [n, setN] = useState(5);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <br />
      n:{" "}
      <input
        type="number"
        value={n}
        onChange={(e) => setN(e.target.valueAsNumber)}
      />
      <button onClick={() => dispatch(incrementByAmount(n))}>+ n</button>
    </div>
  );
}
```
