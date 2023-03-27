import { Group, Label, Shape, Tag, Text } from "react-konva";

const FrameDimentions = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  const dimentionOffset = 20;
  const arrowOffset = dimentionOffset / 2;
  const arrowSize = 5;

  const ArrowHeight = () => (
    <Shape
      sceneFunc={(ctx, shape) => {
        // top pointer
        ctx.moveTo(width + arrowOffset + arrowSize, arrowSize);
        ctx.lineTo(width + arrowOffset, 0);
        ctx.lineTo(width + arrowOffset - arrowSize, arrowSize);

        // line
        ctx.moveTo(width + arrowOffset, 0);
        ctx.lineTo(width + arrowOffset, height);

        // bottom pointer
        ctx.moveTo(width + arrowOffset + arrowSize, height - arrowSize);
        ctx.lineTo(width + arrowOffset, height);
        ctx.lineTo(width + arrowOffset - arrowSize, height - arrowSize);

        ctx.strokeShape(shape);
      }}
      fill="#00D2FF"
      stroke="gray"
      strokeWidth={0.5}
    />
  );
  const ArrowWidth = () => (
    <Shape
      sceneFunc={(ctx, shape) => {
        // top pointer
        ctx.translate(0, height + arrowOffset);
        ctx.moveTo(arrowSize, -arrowSize);
        ctx.lineTo(0, 0);
        ctx.lineTo(arrowSize, arrowSize);

        // line
        ctx.moveTo(0, 0);
        ctx.lineTo(width, 0);

        // bottom pointer
        ctx.moveTo(width - arrowSize, -arrowSize);
        ctx.lineTo(width, 0);
        ctx.lineTo(width - arrowSize, arrowSize);

        ctx.strokeShape(shape);
      }}
      fill="#00D2FF"
      stroke="gray"
      strokeWidth={1}
    />
  );

  const LabelWidth = () => (
    <Label x={width / 2} y={height + arrowOffset - arrowSize}>
      <Tag fill="white" stroke="gray" />
      <Text text={`${width} in`} padding={2} fill="black" />
    </Label>
  );

  const LabelHight = () => (
    <Label x={width + arrowOffset} y={height / 2}>
      <Tag fill="white" stroke="gray" />
      <Text text={`${height} in`} padding={2} fill="black" />
    </Label>
  );

  return (
    <Group>
      <ArrowWidth />
      <LabelWidth />
      <ArrowHeight />
      <LabelHight />
    </Group>
  );
};

export default FrameDimentions;
