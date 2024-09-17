const Heading = (props) => {
  const { level, title, className, ...rest } = props;
  const HeadingTag = `h${level || 1}`;

  return (
    <HeadingTag className={className} {...rest}>
      {title}
    </HeadingTag>
  );
};

export default Heading;
