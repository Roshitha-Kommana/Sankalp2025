import React from "react";

interface TeamMember {
  id: number;
  name: string;
  phone?: string;
  department: string;
  role?: string; // Only for organizer
  category: "organizer" | "team";
  image?: string; // Profile image
}

interface TeamCardProps {
  member: TeamMember;
  onMouseEnter?: (id: number) => void;
  onMouseLeave?: () => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "organizer":
      return "bg-[#feaac0] text-[#141414]";
    case "team":
      return "bg-[#c3f0ca] text-[#141414]";
    default:
      return "bg-gray-300 text-[#141414]";
  }
};

const TeamCard: React.FC<TeamCardProps> = ({
  member,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      className="bg-[#fcf2e8] shadow-md border border-[#141414]/10 hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden"
      onMouseEnter={() => onMouseEnter && onMouseEnter(member.id)}
      onMouseLeave={onMouseLeave}
    >
      {/* ================= MOBILE LAYOUT ================= */}
      <div className="flex flex-col sm:hidden p-3">
        {/* Image / Fallback */}
        <div className="w-full h-72 rounded-xl overflow-hidden relative mb-3">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.parentElement?.querySelector(
                  ".initials-fallback"
                ) as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
          ) : (
            <div
              className={`initials-fallback absolute inset-0 w-full h-full ${getCategoryColor(
                member.category
              )} flex items-center justify-center text-3xl font-bold`}
            >
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-[#141414] mb-1">
            {member.name}
          </h3>
          {member.role && (
            <p
              className={`text-xs font-medium mb-2 px-2 py-1 inline-block rounded-md ${getCategoryColor(
                member.category
              )}`}
            >
              {member.role}
            </p>
          )}
          <p className="text-sm text-gray-700 mb-1 flex items-center justify-center whitespace-nowrap mx-auto">
            <span className="font-semibold text-sm">Dept:</span>&nbsp;<span className="whitespace-nowrap text-sm">{member.department}</span>
          </p>
          {member.phone && (
            <p className="text-xs text-gray-700">
              <span className="font-semibold">Ph:</span> {member.phone}
            </p>
          )}
        </div>
      </div>

      {/* ================= DESKTOP LAYOUT ================= */}
      <div className="hidden sm:flex sm:flex-col p-4">
        {/* Image / Fallback */}
        <div className="w-full h-72 rounded-xl overflow-hidden relative mb-4">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.parentElement?.querySelector(
                  ".initials-fallback"
                ) as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
          ) : (
            <div
              className={`initials-fallback absolute inset-0 w-full h-full ${getCategoryColor(
                member.category
              )} flex items-center justify-center text-4xl font-bold`}
            >
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-[#141414] mb-2">
            {member.name}
          </h3>
          {member.role && (
            <p
              className={`text-sm font-medium mb-2 px-2 py-1 inline-block rounded-md ${getCategoryColor(
                member.category
              )}`}
            >
              {member.role}
            </p>
          )}
          <p className="text-sm text-gray-700 mb-1">
            <span className="font-semibold text-md">Dept:</span>{" "}
            <span className="whitespace-nowrap text-md">{member.department}</span>
          </p>
          {member.phone && (
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Contact:</span> {member.phone}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
