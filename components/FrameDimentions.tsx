import { Group, Label, Shape, Tag, Text } from "react-konva";
import { SIZE_MULTIPLIER } from "../app/constants/plantData";

const FrameDimentions = ({
  width,
  height,
  frameSize,
}: {
  width: number;
  height: number;
  frameSize: number;
}) => {
  const dimentionOffset = 20;
  const arrowOffset = dimentionOffset / 2;
  const arrowSize = 5;

  const ArrowHeight = () => (
    <Shape
      sceneFunc={(ctx, shape) => {
        // top pointer
        ctx.moveTo(
          width + arrowOffset + arrowSize + frameSize * 3,
          arrowSize + frameSize
        );
        ctx.lineTo(width + arrowOffset + frameSize * 3, frameSize);
        ctx.lineTo(
          width + arrowOffset - arrowSize + frameSize * 3,
          arrowSize + frameSize
        );

        // line
        ctx.moveTo(width + arrowOffset + frameSize * 3, frameSize);
        ctx.lineTo(width + arrowOffset + frameSize * 3, height + frameSize);

        // bottom pointer
        ctx.moveTo(
          width + arrowOffset + arrowSize + frameSize * 3,
          height - arrowSize + frameSize
        );
        ctx.lineTo(width + arrowOffset + frameSize * 3, height + frameSize);
        ctx.lineTo(
          width + arrowOffset - arrowSize + frameSize * 3,
          height - arrowSize + frameSize
        );

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
        ctx.translate(frameSize, height + arrowOffset + frameSize * 2);
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
    <Label x={width / 2} y={height + arrowOffset - arrowSize + frameSize * 2}>
      <Tag fill="white" stroke="gray" />
      <Text text={`${width / SIZE_MULTIPLIER} in`} padding={2} fill="black" />
    </Label>
  );

  const LabelHight = () => (
    <Label x={width + arrowOffset + frameSize * 2} y={height / 2}>
      <Tag fill="white" stroke="gray" />
      <Text text={`${height / SIZE_MULTIPLIER} in`} padding={2} fill="black" />
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
