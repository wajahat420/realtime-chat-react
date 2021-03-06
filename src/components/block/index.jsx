const Block = ({setBlock, handleBlock, status}) => {
    return(
        <div className="block">
            <div className="block_inner">
                <p className="block_title">Are you sure you want to block this contact ?</p>
                <div className="block_btns">
                    <button onClick={() => setBlock(false)}>CANCEL</button>
                    <button onClick={handleBlock}>{status ? 'UNBLOCK' : 'BLOCK'}</button>
                </div>
            </div>
        </div>
    )
}

export default Block