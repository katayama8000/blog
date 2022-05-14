import { Swiper, SwiperSlide } from "swiper/react"; //カルーセル用のタグをインポート
import SwiperCore, { Pagination, Navigation } from "swiper"; //使いたい機能をインポート
import { Badge, Grid, Image } from "@mantine/core";

SwiperCore.use([Pagination, Navigation]);

// カルーセルにする画像のソースをリストにします
const images = [
  "img/gollira.jpeg",
  "img/gollira.jpeg",
  "img/gollira.jpeg",
  "img/gollira.jpeg",
  "img/gollira.jpeg",
];

const TestCarousel = () => {
  return (
    <Swiper
      slidesPerView={1} //一度に表示するスライドの数
      pagination={{
        clickable: true,
      }} //　何枚目のスライドかを示すアイコン、スライドの下の方にある
      navigation //スライドを前後させるためのボタン、スライドの左右にある
      loop={true}
    >
      {images.map((src: string, index: number) => {
        return (
          <SwiperSlide key={`${index}`}>
            <Image src={src} width={640} height={400} alt="gollira" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default TestCarousel;
