import RoleDetailsCard from "./RoleDetailsCard";
import RolePermissionsCard from "./RolePermissionCard";
import { ArrowLeft, EditUser, Details } from "@global/Icons";
import Button from "@components/ui/Button";
import image from "/assets/pp1.png";

const RolePage = () => {
	return (
		<section className="w-auto mt-6 border border-border rounded-2xl space-y-8 min-w-[93%] sm:space-y-10 lg:space-y-12">
			<div className="flex p-6 sm:p-8 lg:p-10 border-b items-center border-b-border justify-between">
				<div className="">
					<h2 className="text-lg sm:text-xl lg:text-2xl mb-1 font-semibold">
						Review Role Information
					</h2>
					<p className="text-subText text-sm sm:text-base lg:text-lg">
						Do a final check to make sure there are no mistakes
					</p>
				</div>
				<div className="flex gap-2 sm:gap-3 lg:gap-4">
					<div className="relative">
						<span className="absolute flex items-center justify-center bg-black/30 inset-0 rounded-full">
							<EditUser className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
						</span>
						<img className="size-10 sm:size-12 lg:size-14" src={image} alt="" />
					</div>
					<div className="">
						<h4 className="text-sm sm:text-base lg:text-lg">James Campion</h4>
						<p className="text-sm sm:text-base lg:text-lg text-subText">
							Reporting manager
						</p>
					</div>
				</div>
			</div>

			<div className="flex flex-wrap md:flex-nowrap gap-4 sm:gap-6 lg:gap-8">
				<RoleDetailsCard />
				<RolePermissionsCard />
			</div>
		</section>
	);
};

export default RolePage;
