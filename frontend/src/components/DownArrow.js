const DownArrow = ({ to }) => {
    return (
        <div class="work-arrow">

            {/* <h5>
                <a href={`#${to}`}>SCROLL TO DISCOVER</a>
            </h5> */}

            <a href={`#${to}`}>
                .
                <div class="down-arrow">
                    
                        <div class="chevron"></div>
                        <div class="chevron"></div>
                        <div class="chevron"></div>
                
                </div>
            </a>

        </div>
    )
}

export default DownArrow;