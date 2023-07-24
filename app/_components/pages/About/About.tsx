import style from './About.module.css';

export const About = () => {
  return (
    <div className={style.about}>
      <div className={style.about__content}>
        <h2 className={style.about__title}>
          学習を効果的にサポート
        </h2>
        <p className={style.about__description}>
          単語帳は、効果的な学習をサポートするための機能を備えています。まず、エクセルファイルを使用して単語を簡単に登録できる機能があります。エクセルの使い慣れた環境で単語を一括登録できるため、手間がかかりません。
        </p>
        <p className={style.about__description}>
          さらに、単語帳は忘却曲線の可視化をサポートしています。忘却曲線とは、学習した情報が時間の経過とともにどのように忘れられるかを示すグラフです。これにより、効率的な学習のための最適なタイミングを見つけて復習ができるようになります。
        </p>
        <p className={style.about__description}>
          これからもより効率的な学習をサポートするために新しい機能を追加していきます。
        </p>
      </div>
    </div>
  );
};
