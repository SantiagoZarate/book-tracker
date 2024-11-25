import { opacity } from '@/app/lib/motion-animations';
import { SessionDTO } from '@/shared/dtos/sessionDTO';
import { formatDistance } from 'date-fns';
import { motion } from 'framer-motion';
import React from 'react';
import { SessionContentForm } from './SessionContentForm';

interface Props {
  session: Omit<SessionDTO, 'trackId'> | null;
  onAddContent: (content: string) => void;
}

const SessionDialog = React.forwardRef<HTMLDivElement, Props>(
  ({ session, onAddContent }, ref) => {
    if (!session) {
      return;
    }

    return (
      <motion.section
        className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 p-2"
        {...opacity}
      >
        <motion.div
          ref={ref}
          className="flex w-full max-w-[500px] flex-col rounded-md border border-dashed border-input bg-secondary"
          layoutId={`session-${session.id}`}
        >
          <section className="flex flex-col gap-2 p-1">
            <motion.p layoutId={`pages-${session.id}`} className="text-sm">
              {session.pagesRead} Pages
            </motion.p>
            <footer className="flex divide-x opacity-50 [&>:first-child]:pr-2 [&>:last-child]:pl-2">
              <motion.p layoutId={`date-${session.id}`} className="text-xs">
                {session.createdAt}
              </motion.p>
              <motion.p layoutId={`since-${session.id}`} className="text-xs">
                {formatDistance(new Date(session.createdAt), new Date())}
              </motion.p>
            </footer>
          </section>
          <SessionContentForm
            defaultContent={session.content}
            onSaveContent={onAddContent}
          />
        </motion.div>
      </motion.section>
    );
  },
);

SessionDialog.displayName = 'SessionDialog';

export { SessionDialog };

// export function SessionDialog({ session, onAddContent, ref }: Props) {
//   if (!session) {
//     return;
//   }

//   return (
//     <motion.section
//       className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 p-2"
//       {...opacity}
//     >
//       <motion.div
//         ref={ref}
//         className="flex w-full max-w-[500px] flex-col rounded-md border border-dashed border-input bg-secondary"
//         layoutId={`session-${session.id}`}
//       >
//         <section className="flex flex-col gap-2 p-1">
//           <motion.p layoutId={`pages-${session.id}`} className="text-sm">
//             {session.pagesRead} Pages
//           </motion.p>
//           <footer className="flex divide-x opacity-50 [&>:first-child]:pr-2 [&>:last-child]:pl-2">
//             <motion.p layoutId={`date-${session.id}`} className="text-xs">
//               {session.createdAt}
//             </motion.p>
//             <motion.p layoutId={`since-${session.id}`} className="text-xs">
//               {formatDistance(new Date(session.createdAt), new Date())}
//             </motion.p>
//           </footer>
//         </section>
//         <SessionContentForm
//           defaultContent={session.content}
//           onSaveContent={onAddContent}
//         />
//       </motion.div>
//     </motion.section>
//   );
// }
