const GetErrorFormat = require('../middleware/error_json');
const Blog = require('../schemas/blog');
const blogService = require('../services/blog');

// Admin Functions

exports.create = async function (req, res, next) {
  const slug = blogService.ConvertToSlug(req.body.title);
  var isTitle = await blogService.IsBlogBySlug(slug);
  if (isTitle) return res.status(400).json({ message: 'Title already has been present. Please use different title.' });

  const blog = new Blog({
    ...req.body,
    slug,
  });

  try {
    var data = await blog.save(data);
  } catch (error) {
    const err = GetErrorFormat(error);
    return res.status(err.status || 500).json(err);
  }

  if (data) return res.status(201).json({
    message: 'Blog has been created successfully.',
    data
  });
  else return res.status(400).json({ message: 'Blog falied to create. Please try again!' });
}

exports.allBlogs = async function (req, res, next) {
  let search = (req.query.search || '').trim();
  let pageNo = req.query.pageNo ? req.query.pageNo : 1;
  let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
  var skip = (pageSize * pageNo) - pageSize;
  let filters = {
    is_active: true
  };
  if (search) {
    filters['$or'] = [
      { title: { '$regex': search, '$options': 'i' } },
    ]
  }

  const sort = {
    createdAt: -1,
  }

  try {
    items = await Blog.find(filters).sort(sort).skip(skip).limit(pageSize);
    count = await Blog.count(filters);
  } catch (error) {
    return res.status(500).json(error);
  }

  return res.json({ items, count });
};

exports.getBlogBySlug = async function (req, res, next) {
  var data = await blogService.GetBlogBySlug(req.params.slug);
  if (!data) return res.status(404).json({ message: "Blog not found" });
  return res.json(data);
};

exports.update = async function (req, res, next) {
  var slug = req.params.slug;
  try {
    var blog_details = await blogService.GetBlogBySlug(slug);
    if (!blog_details) return res.status(404).json({ message: "Blog not found" });
  } catch (error) {
    return res.status(error.code ?? 400).json(error);
  }

  data = {};
  if (req.body.title) {
    data['title'] = req.body.title;
    data['slug'] = blogService.ConvertToSlug(req.body.title);
  }
  if (req.body.content) data['content'] = req.body.content;
  if (req.body.keywords) data['keywords'] = req.body.keywords;
  if (req.body.is_active) data['is_active'] = req.body.is_active;

  if (Object.keys(data).length === 0) return res.status(400).json({ message: "Invalid json" });

  try {
    var updatedData = await Blog.updateOne({ slug }, data);
  } catch (error) {
    const err = GetErrorFormat(error);
    return res.status(err.status || 500).json(err);
  }
  if (updatedData) {
    return res.json({
      message: "Blog Updated Succefully",
      data: {
        ...data,
        _id: blog_details._id
      }
    })
  }
  return res.status(400).json({
    message: "Blog Failed To Update"
  });

};

exports.deleteBySlug = async function (req, res, next) {
  var slug = req.params.slug;
  var isBlog = await blogService.IsBlogBySlug(slug);
  if (!isBlog) return res.status(404).json({ message: "Blog not found" });

  try {
    var updatedData = await Blog.updateOne({ slug }, { is_active: false });
  } catch (error) {
    return res.status(500).json(error);
  }
  if (updatedData) {
    return res.json({
      message: "Blog deleted succefully",
      slug
    })
  }
  return res.status(400).json({
    message: "Delete operation failed. Please try again."
  });

};