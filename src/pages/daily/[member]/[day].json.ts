import type { APIRoute } from "astro";
import { MEMBERS, type InstructionRange } from "../../../data/members";

type DailyInstructions = {
  ranges: InstructionRange[];
};

const imagePathsForRanges = (ranges: InstructionRange[]) =>
  ranges.flatMap(({ imageDir, startPage, endPage }) =>
    Array.from({ length: endPage - startPage + 1 }, (_, index) => {
      const page = String(startPage + index).padStart(4, "0");
      return `${imageDir}/page-${page}.jpg`;
    })
  );

export function getStaticPaths() {
  return MEMBERS.flatMap((member) =>
    member.days.map((day) => ({
      params: { member: member.id, day: String(day.day) },
      props: { ranges: day.ranges },
    }))
  );
}

export const GET: APIRoute<DailyInstructions> = ({ props }) =>
  new Response(JSON.stringify({ images: imagePathsForRanges(props.ranges) }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
