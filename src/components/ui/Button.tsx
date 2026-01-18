import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    label?: React.ReactNode;
    variant?: 'add-empty' | 'add-not-empty' | 'delete' | 'modify-empty' | 'modify-not-empty';
    shape?: 'rect' | 'circle';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, icon, label, variant = 'add-empty', shape = 'rect', ...props }, ref) => {
        const variantClass = `btn-${variant}`;
        const shapeClass = `btn-${shape}`;
        const className = `btn ${variantClass} ${shapeClass}`;

        // children이 있으면 기존 방식 사용, icon/label이 있으면 반응형 처리
        const content = children || (
            <>
                {icon && <span className="flex items-center justify-center">{icon}</span>}
                {label && <span className="hidden sm:inline">{label}</span>}
            </>
        );

        return (
            <button
                ref={ref}
                className={className}
                {...props}
            >
                {content}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;