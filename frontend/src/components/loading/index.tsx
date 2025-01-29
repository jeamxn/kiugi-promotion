const Loading = ({
  size,
}: {
  size?: number;
}) => {
  const s = size ?? 48;
  return (
    <span
      className="loader border-white border-b-transparent rounded-full"
      style={{
        width: s,
        height: s,
        borderWidth: (5 / 48) * s,
      }}
    />
  );
};

export default Loading;
