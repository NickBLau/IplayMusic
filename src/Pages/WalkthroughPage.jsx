import { Link } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
import { IoIosMusicalNote } from "react-icons/io";
import { IoHeart, IoRadio } from "react-icons/io5";
import waves from "../assets/waves.svg";
import tw from "tailwind-styled-components";

const Container = tw.div`
m-0 
p-0 
text-center
dark:bg-gradient-to-r from-gradient-color1 to-gradient-color2
`;

const StyledHeader = tw.h2`
text-secondary-color
leading-8
text-3xl
dark:text-white
`;

const StyledP = tw.p`
text-secondary-color
text-sm
max-w-xs
dark:text-white
`;

const ButtonCircle = tw.div`
flex 
justify-center 
items-center 
w-20
h-20

border-[3px] 
border-[solid] 
border-[black] 
dark:border-[white] 
rounded-[100%]

`;

const StyledDiv = tw.div`
flex
flex-col
justify-center
items-center
gap-5
dark:text-white
`;

const PaginationButton = tw.div`
flex 
justify-center 
items-center 
w-20
h-20
border-none
bg-primarycolor
text-white
dark:bg-white
dark:text-gradient-color2
rounded-[100%]
`;

const StyledNav = tw.nav`
flex 
justify-center 
m-auto 
gap-4
`;

const StyledIoRadio = tw(IoRadio)`
w-8
h-8

`;
const StyledHeart = tw(IoHeart)`
w-8
h-8

`;
const StyledIoIosMusicalNote = tw(IoIosMusicalNote)`
w-8
h-8

`;

const WalkthroughPage = () => {
  return (
    <>
      <Container>
        <Swiper
          className="swiper overflow-hidden"
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          // pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <SwiperSlide className="Grab">
            <img className="pb-16 mx-auto w-full" src={waves} alt="" />
            <StyledDiv>
              <div className="flex flex-col">
                <StyledHeader>Where Words Fail, </StyledHeader>
                <StyledHeader>Music Speaks </StyledHeader>
              </div>
              <StyledP>
                Vivamus auctor dui dignissim, sollicitudin nunc ac, aliquam
                justo. Vestibulum pellentesque lacinia eleifend.
              </StyledP>
              <StyledNav className="py-3">
                <PaginationButton>
                  {" "}
                  <StyledIoRadio />
                </PaginationButton>
                <ButtonCircle>
                  <StyledHeart />
                </ButtonCircle>
                <ButtonCircle>
                  <StyledIoIosMusicalNote />
                </ButtonCircle>
              </StyledNav>
              <Link className="pb-10" to="/login">
                Skip
              </Link>
            </StyledDiv>
          </SwiperSlide>
          <SwiperSlide className="Grab">
            <img className="pb-16 mx-auto w-full" src={waves} alt="" />
            <StyledDiv>
              <div className="flex flex-col">
                <StyledHeader>No Music</StyledHeader>
                <StyledHeader>No Life</StyledHeader>
              </div>
              <StyledP>
                Vivamus auctor dui dignissim, sollicitudin nunc ac, aliquam
                justo. Vestibulum pellentesque lacinia eleifend.
              </StyledP>

              <StyledNav className="py-3">
                <ButtonCircle>
                  {" "}
                  <StyledIoRadio />
                </ButtonCircle>
                <PaginationButton>
                  <StyledHeart />
                </PaginationButton>
                <ButtonCircle>
                  <StyledIoIosMusicalNote />
                </ButtonCircle>
              </StyledNav>
              <Link className="pb-10" to="/login">
                Skip
              </Link>
            </StyledDiv>
          </SwiperSlide>
          <SwiperSlide className="Grab">
            <img className="pb-16 mx-auto w-full" src={waves} alt="" />
            <StyledDiv>
              <div className="flex flex-col">
                <StyledHeader>Peace.Love</StyledHeader>
                <StyledHeader>Music</StyledHeader>
              </div>
              <StyledP>
                Vivamus auctor dui dignissim, sollicitudin nunc ac, aliquam
                justo. Vestibulum pellentesque lacinia eleifend.
              </StyledP>

              <StyledNav className="py-3">
                <ButtonCircle>
                  {" "}
                  <StyledIoRadio />
                </ButtonCircle>
                <ButtonCircle>
                  <StyledHeart />
                </ButtonCircle>
                <PaginationButton>
                  <StyledIoIosMusicalNote />
                </PaginationButton>
              </StyledNav>
              <Link className="pb-10" to="/login">
                Skip
              </Link>
            </StyledDiv>
          </SwiperSlide>
        </Swiper>
      </Container>
    </>
  );
};

export default WalkthroughPage;
