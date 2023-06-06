const Blog = require('../schemas/blog');

async function GetBlogBySlug(slug) {
    return new Promise(async (resolve, reject) => {
        let filter = {
            slug,
            is_active: true
        }
        try {
            var data = await Blog.findOne(filter).select('-__v');
            return resolve(data);
        } catch (error) {
            return reject({
                code: 500,
                message: "Something went wrong",
                error: error
            });
        }
    })
}

async function IsBlogBySlug(slug) {
    try {
        var data = await Blog.count({ slug, is_active: true });
        if (!data || data == 0) return false;
        return true;
    } catch (error) {
        return {
            code: 500,
            message: "Something went wrong",
            error: error
        };
    }
}

async function IsBlogBySlug(slug) {
    try {
        var data = await Blog.count({ slug, is_active: true });
        if (!data || data == 0) return false;
        return true;
    } catch (error) {
        return {
            code: 500,
            message: "Something went wrong",
            error: error
        };
    }
}

function ConvertToSlug(value) {
    return value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

module.exports = {
    GetBlogBySlug,
    IsBlogBySlug,
    ConvertToSlug,
}
