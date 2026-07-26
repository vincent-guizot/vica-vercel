"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { Lesson } from "../types/lesson.type";

interface LessonTableProps {
  lessons: Lesson[];
}

const MotionTableRow = motion(TableRow);

export default function LessonTable({ lessons }: LessonTableProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-2xl border border-[#D9E2F2] bg-white shadow-sm"
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F8FAFF] hover:bg-[#F8FAFF]">
            <TableHead className="h-14 font-semibold text-[#0D1B2A]">
              Lesson
            </TableHead>

            <TableHead className="font-semibold text-[#0D1B2A]">
              Program
            </TableHead>

            <TableHead className="font-semibold text-[#0D1B2A]">
              Module
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {lessons.map((lesson, index) => (
            <MotionTableRow
              key={lesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.04,
                duration: 0.25,
              }}
              onClick={() => router.push(`/lessons/${lesson.slug}`)}
              className="cursor-pointer transition-colors duration-200 hover:bg-[#EDF2FF]"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EDF2FF]">
                    <BookOpen size={20} className="text-[#5477A6]" />
                  </div>

                  <div>
                    <p className="font-semibold text-[#0D1B2A]">
                      {lesson.title}
                    </p>

                    <p className="text-xs text-slate-500">Markdown Lesson</p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <Badge
                  variant="outline"
                  className="border-[#5477A6] bg-[#EDF2FF] text-[#5477A6]"
                >
                  {lesson.programTitle ?? lesson.programSlug ?? "-"}
                </Badge>
              </TableCell>

              <TableCell className="text-slate-700">
                {lesson.moduleTitle ?? lesson.moduleSlug ?? "-"}
              </TableCell>
            </MotionTableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
