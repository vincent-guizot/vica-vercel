"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Resource } from "../types/resource.type";
import { getResourceIcon } from "../utils/getResourceIcon";

interface ResourceTableProps {
  resources: Resource[];
}

const MotionTableRow = motion(TableRow);

export default function ResourceTable({ resources }: ResourceTableProps) {
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
              Resource
            </TableHead>

            <TableHead className="font-semibold text-[#0D1B2A]">Type</TableHead>

            <TableHead className="font-semibold text-[#0D1B2A]">Size</TableHead>

            <TableHead className="font-semibold text-[#0D1B2A]">
              Created
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {resources.map((resource, index) => {
            const { Icon, color } = getResourceIcon(resource.type);

            return (
              <MotionTableRow
                key={resource.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.04,
                  duration: 0.25,
                }}
                onClick={() => router.push(`/resources/${resource.slug}`)}
                className="cursor-pointer transition-colors duration-200 hover:bg-[#EDF2FF]"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EDF2FF]">
                      <Icon size={20} className={color} />
                    </div>

                    <div>
                      <p className="font-semibold text-[#0D1B2A]">
                        {resource.title}
                      </p>

                      <p className="text-xs text-slate-500">
                        {resource.description ?? "Learning Resource"}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className="border-[#5477A6] bg-[#EDF2FF] text-[#5477A6]"
                  >
                    {resource.type.toUpperCase()}
                  </Badge>
                </TableCell>

                <TableCell className="text-slate-700">
                  {resource.size ?? "-"}
                </TableCell>

                <TableCell className="text-slate-500">
                  {resource.createdAt ?? "-"}
                </TableCell>
              </MotionTableRow>
            );
          })}
        </TableBody>
      </Table>
    </motion.div>
  );
}
