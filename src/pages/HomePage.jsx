import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const HomePage = () => {
    return (
        <main>
            <section>
                <div className="main-content">
                    <h1>Welcome to Your New Productivity Partner!</h1>
                    <p>🌟 Where Your Tasks Meet Simplicity and Efficiency 🌟</p>
                </div>
                <DotLottieReact
                    src="https://lottie.host/48476894-07bb-481f-8091-022dedf07099/WPwbFuTGhA.lottie"
                    loop
                    autoplay
                />
            </section>
            <section>
                <DotLottieReact
                    src="https://lottie.host/77690e12-1264-4fdd-8fcf-2143ade1b7b6/0xYrX05IdL.lottie"
                    loop
                    autoplay
                />
                <div className="main-content">
                    <h2>Get Started Today!</h2>
                    <p>
                        Take the first step toward a more organized, stress-free
                        life. Whether you&apos;re managing work, school, or
                        personal projects, our task manager is here to empower
                        you every step of the way.
                    </p>
                    <p>
                        {" "}
                        <i>💡 Your future self will thank you.</i>{" "}
                    </p>
                </div>
            </section>
            <section>
                <div className="list-content">
                    <h2>👋 Let&apos;s get things done together!</h2>
                    <div className="lists">
                        <div className="content-list">
                            <img src="/free.png" alt="" />
                            <p>Create your account in just a few clicks.</p>
                        </div>
                        <div className="content-list">
                            <img src="/smart.png" alt="" />
                            <p>Login and manage your tasks effortlessly.</p>
                        </div>
                        <div className="content-list">
                            <img src="/daily.png" alt="" />
                            <p>
                                Watch your productivity soar as you stay on top
                                of everything that matters.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
