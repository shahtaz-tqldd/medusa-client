export interface NavLinkProps {
  href?: string;
  label: string;
  icon: React.ComponentType<{ size?: number; }>;
  handleClick?: (isOpenModal: boolean) => void;
}

export interface NavDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsEmailModalOpen: (isOpenModal: boolean) => void;
}