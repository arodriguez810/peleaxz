using DragonTool.Styles;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace DragonTool
{
    public partial class Migrate : Form
    {
        public void setStyles(dynamic control)
        {
            this.FormBorderStyle = FormBorderStyle.FixedToolWindow;
            this.MaximumSize = this.Size;

            BackColor = Colors.texticons;
            if (control.GetType() == typeof(Panel))
                BackColor = Colors.primary;

            this.BackColor = Colors.lightprimary;
            foreach (Control item in control.Controls)
            {
                item.ForeColor = Colors.primarytext;
                if (item.GetType() == typeof(Button))
                {
                    item.BackColor = Colors.accent;
                    item.ForeColor = Colors.texticons;
                    ((Button)item).FlatStyle = FlatStyle.Popup;
                    ((Button)item).Font = new Font(Font.FontFamily, 12, FontStyle.Bold);
                }
                if (item.GetType() == typeof(DataGridView))
                {
                    ((DataGridView)item).BackgroundColor = Colors.lightprimary;
                    ((DataGridView)item).ForeColor = Colors.primarytext;
                    ((DataGridView)item).DefaultCellStyle.ForeColor = Colors.primarytext;
                    ((DataGridView)item).DefaultCellStyle.BackColor = Colors.lightprimary;
                    ((DataGridView)item).DefaultCellStyle.SelectionBackColor = Colors.darkprimary;
                    ((DataGridView)item).ColumnHeadersDefaultCellStyle.BackColor = Colors.darkprimary;
                    ((DataGridView)item).RowHeadersDefaultCellStyle.BackColor = Colors.darkprimary;
                }
                if (item.GetType() == typeof(TextBox))
                {
                    ((TextBox)item).BorderStyle = BorderStyle.None;
                    ((TextBox)item).BackColor = control.BackColor;
                    PictureBox downny = new PictureBox();
                    downny.Location = new Point(item.Location.X, item.Location.Y + item.Height + 2);
                    downny.Height = 2;
                    downny.Width = item.Width;
                    downny.BackColor = Colors.accent;
                    if (item.Visible == true)
                        control.Controls.Add(downny);
                    ((TextBox)item).GotFocus += delegate (object sender, EventArgs e)
                    {
                        downny.BackColor = Colors.darkprimary;
                    };
                    ((TextBox)item).LostFocus += delegate (object sender, EventArgs e)
                    {
                        downny.BackColor = Colors.accent;
                    };
                }
            }
        }
        private void Migrate_Load(object sender, EventArgs e)
        {
            setStyles(this);

        }
        public Migrate()
        {
            InitializeComponent();
        }

        private static void DirectoryCopy(string sourceDirName, string destDirName, bool copySubDirs)
        {
            DirectoryInfo dir = new DirectoryInfo(sourceDirName);
            if (!dir.Exists)
            {
                throw new DirectoryNotFoundException(
                    "Source directory does not exist or could not be found: "
                    + sourceDirName);
            }
            DirectoryInfo[] dirs = dir.GetDirectories();
            if (!Directory.Exists(destDirName))
            {
                Directory.CreateDirectory(destDirName);
            }
            FileInfo[] files = dir.GetFiles();
            foreach (FileInfo file in files)
            {
                string temppath = Path.Combine(destDirName, file.Name);
                file.CopyTo(temppath, true);
            }
            if (copySubDirs)
            {
                foreach (DirectoryInfo subdir in dirs)
                {
                    string temppath = Path.Combine(destDirName, subdir.Name);
                    DirectoryCopy(subdir.FullName, temppath, copySubDirs);
                }
            }
        }

        private void btnMigrar_Click(object sender, EventArgs e)
        {
            string alfa = txtAlfa.Text;
            string[] fileToMigrate = txtPaths.Text.Split(new string[] { Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries);
            string[] betas = txtBetas.Text.Split(new string[] { Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries);
            string[] ignores = txtIgnores.Text.Split(new string[] { Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries);
            foreach (var beta in betas)
            {
                foreach (var file in fileToMigrate)
                {
                    string name = Path.Combine(alfa, file);
                    string destiny = Path.Combine(beta, file);

                    FileAttributes attr = File.GetAttributes(name);
                    if ((attr & FileAttributes.Directory) == FileAttributes.Directory)
                    {
                        DirectoryCopy(name, destiny, true);
                    }
                    else
                    {
                        File.Copy(name, destiny, true);
                    }
                }
            }
        }
    }
}

