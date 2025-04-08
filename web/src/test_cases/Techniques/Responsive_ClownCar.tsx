interface ResponsiveClownCarProps {
    smallSrc: string;
    largeSrc: string;
    altText: string;
}

export const ResponsiveClownCar: React.FC<ResponsiveClownCarProps> = ({ smallSrc, largeSrc, altText }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <style>
                {`
                    svg {
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                    @media screen and (max-width: 600px) {
                        svg { background-image: url(${smallSrc}); }
                    }
                    @media screen and (min-width: 601px) {
                        svg { background-image: url(${largeSrc}); }
                    }
                `}
            </style>
            <title>{altText}</title>
        </svg>
    );
};