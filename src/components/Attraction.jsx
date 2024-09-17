import tw from "tailwind-styled-components";

const StyledImg = tw.img`
inline-block h-6 w-6 rounded-full
`;

const StyledH3 = tw.h3`
font-bold
text-white
drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)]
`;

const Attraction = () => {
  return (
    <>
      <StyledH3 className="font-bold text-white">45 #hashtags</StyledH3>
      <div className="flex -space-x-2 overflow-hidden items-center pt-4">
        <StyledImg
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <StyledImg
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <StyledImg
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
          alt=""
        />
        <span className="text-xs pl-4 flex gap-1 text-white">
          <StyledH3 className="font-bold">
            3,123
            <span className="ml-1 font-normal"> are talking about this</span>
          </StyledH3>
        </span>
      </div>
    </>
  );
};

export default Attraction;
