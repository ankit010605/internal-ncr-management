const MainLayout = ({ children }) => {
    return (
        <div
            style={{
                maxWidth: "1400px",
                margin: "0 auto",
                padding: "25px",
            }}
        >
            {children}
        </div>
    );
};

export default MainLayout;