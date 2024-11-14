import { useEffect } from 'react';

const AdComponent: React.FC = () => {
    useEffect(() => {
        try {
            // Load Google Ads
            (window as any).adsbygoogle = (window as any).adsbygoogle || [];
            (window as any).adsbygoogle.push({});
        } catch (error) {
            console.error("AdSense Error:", error);
        }
    }, []);

    return (
        <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-3727276762008014"
            data-ad-slot="3706274932"
            data-ad-format="auto"
            data-full-width-responsive="true">
        </ins>
    );
};

export default AdComponent;